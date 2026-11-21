import type { FiltersConfig } from 'librechat-data-provider';
import {
  assertWithinFileTokenLimit,
  assertExtractedTextInspectable,
  extractInspectableFileText,
  getFileExtractionLogDetails,
} from './extract';
import { UninspectableFileError } from '~/protection/files';
import { resolveUploadErrorMessage } from '~/utils/files';
import { processTextWithTokenLimit } from '~/utils/text';
import { countTokens } from '~/utils/tokenizer';

const strictExtractedTextFilters = {
  files: {
    pii: {
      fields: ['extracted_text'],
      uninspectable: 'block',
    },
  },
} as FiltersConfig;

describe('extracted file text inspection boundary', () => {
  it('removes submitted filenames and raw errors from protected extraction logs', () => {
    const rawFailure = Object.assign(new Error('PRIVATE provider response'), {
      response: { status: 502, data: 'PRIVATE document fragment' },
    });

    const protectedDetails = getFileExtractionLogDetails({
      filters: strictExtractedTextFilters,
      filename: 'PRIVATE-report.pdf',
      fileId: 'server-file-id',
      error: rawFailure,
    });

    expect(protectedDetails).toEqual({
      contentProtected: true,
      fileLabel: 'file_id=server-file-id',
      errorMetadata: { type: 'Error', status: 502 },
    });
    expect(JSON.stringify(protectedDetails)).not.toContain('PRIVATE');

    const compatibilityDetails = getFileExtractionLogDetails({
      filename: 'report.pdf',
      fileId: 'server-file-id',
      error: rawFailure,
    });
    expect(compatibilityDetails).toEqual({
      contentProtected: false,
      fileLabel: '"report.pdf"',
      errorMetadata: rawFailure,
    });
  });

  it('converts strict extraction failures into a stable raw-free policy error', async () => {
    const rawFailure = new Error('PRIVATE parser credential and document fragment');

    await expect(
      extractInspectableFileText({
        filters: strictExtractedTextFilters,
        extract: async () => {
          throw rawFailure;
        },
      }),
    ).rejects.toMatchObject({
      code: 'content_filter_uninspectable',
      statusCode: 400,
      body: {
        error: 'content_filter_uninspectable',
        message: 'Submitted file content could not be inspected before processing.',
        source: 'file',
        field: 'extracted_text',
      },
    });

    try {
      await extractInspectableFileText({
        filters: strictExtractedTextFilters,
        extract: async () => {
          throw rawFailure;
        },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(UninspectableFileError);
      expect(JSON.stringify((error as UninspectableFileError).body)).not.toContain('PRIVATE');
    }
  });

  it.each([null, undefined, '', '   '])(
    'fails closed when strict extraction returns %p',
    async (text) => {
      await expect(
        extractInspectableFileText({
          filters: strictExtractedTextFilters,
          extract: async () => (text == null ? text : { text, bytes: text.length }),
        }),
      ).rejects.toBeInstanceOf(UninspectableFileError);
    },
  );

  it('returns inspectable extracted text unchanged', async () => {
    const extracted = { text: 'inspectable text', bytes: 16, filepath: 'doc://result' };

    await expect(
      extractInspectableFileText({
        filters: strictExtractedTextFilters,
        extract: async () => extracted,
      }),
    ).resolves.toBe(extracted);
  });

  it('preserves extraction failures and empty results when fail-close is not selected', async () => {
    const rawFailure = new Error('legacy extraction failure');

    await expect(
      extractInspectableFileText({
        extract: async () => {
          throw rawFailure;
        },
      }),
    ).rejects.toBe(rawFailure);
    await expect(
      extractInspectableFileText({
        extract: async () => ({ text: '   ', bytes: 3 }),
      }),
    ).resolves.toEqual({ text: '   ', bytes: 3 });
  });

  it('guards successful extraction before persistence while preserving compatibility mode', () => {
    expect(() =>
      assertExtractedTextInspectable({
        filters: strictExtractedTextFilters,
        text: '   ',
      }),
    ).toThrow(UninspectableFileError);
    expect(() => assertExtractedTextInspectable({ text: '   ' })).not.toThrow();
    expect(() =>
      assertExtractedTextInspectable({
        filters: strictExtractedTextFilters,
        text: 'inspectable text',
      }),
    ).not.toThrow();
  });
});

// NJ: Upload-time file token limit tests.
describe('assertWithinFileTokenLimit', () => {
  const NJ_FILE_TOKEN_LIMIT = 175_000;
  const oversizedText = 'x'.repeat(NJ_FILE_TOKEN_LIMIT + 1);

  const getTokenLimitError = async (tokenCount: number) => {
    try {
      await assertWithinFileTokenLimit({
        text: oversizedText,
        filename: 'report.pdf',
        fileTokenLimit: NJ_FILE_TOKEN_LIMIT,
        tokenCountFn: () => tokenCount,
      });
    } catch (error) {
      return error as Error & { userErrorStatusCode?: number };
    }
    return undefined;
  };

  it.each([174_999, 175_000])('accepts text counted at %i tokens', async (tokenCount) => {
    await expect(getTokenLimitError(tokenCount)).resolves.toBeUndefined();
  });

  it('rejects text over the token limit with a 400 error', async () => {
    const error = await getTokenLimitError(175_001);

    expect(error?.message).toBe(
      '"report.pdf" exceeds token limit (maximum 175,000 tokens). Split the document into smaller files and try again.',
    );
    expect(error?.userErrorStatusCode).toBe(400);
  });

  it('reaches the user through the existing upload error allowlist', async () => {
    const error = await getTokenLimitError(240_000);

    expect(resolveUploadErrorMessage(error)).toBe(error?.message);
    expect(resolveUploadErrorMessage(error, 'Error processing file', true)).toBe(
      'File content exceeds token limit',
    );
  });

  it('skips counting text whose UTF-8 size cannot exceed the limit', async () => {
    const tokenCountFn = jest.fn(() => Number.MAX_SAFE_INTEGER);

    await assertWithinFileTokenLimit({
      text: 'x'.repeat(NJ_FILE_TOKEN_LIMIT),
      filename: 'notes.txt',
      fileTokenLimit: NJ_FILE_TOKEN_LIMIT,
      tokenCountFn,
    });

    expect(tokenCountFn).not.toHaveBeenCalled();
  });

  it('counts multi-byte text whose UTF-8 size exceeds the limit', async () => {
    const tokenCountFn = jest.fn(() => 1);

    await assertWithinFileTokenLimit({
      text: 'é'.repeat(6),
      filename: 'accents.txt',
      fileTokenLimit: 10,
      tokenCountFn,
    });

    expect(tokenCountFn).toHaveBeenCalledTimes(1);
  });

  it.each([undefined, 0])('does not check when the limit is %p', async (fileTokenLimit) => {
    const tokenCountFn = jest.fn(() => Number.MAX_SAFE_INTEGER);

    await expect(
      assertWithinFileTokenLimit({
        text: oversizedText,
        filename: 'report.pdf',
        fileTokenLimit,
        tokenCountFn,
      }),
    ).resolves.toBeUndefined();
    expect(tokenCountFn).not.toHaveBeenCalled();
  });

  it('rejects exactly the text that turn-time file context would truncate', async () => {
    const text = 'The quick brown fox jumps over the lazy dog. '.repeat(50);
    const tokenCount = await countTokens(text);
    const truncatedAt = async (tokenLimit: number) =>
      (await processTextWithTokenLimit({ text, tokenLimit, tokenCountFn: countTokens }))
        .wasTruncated;

    expect(await truncatedAt(tokenCount)).toBe(false);
    expect(await truncatedAt(tokenCount - 1)).toBe(true);
    await expect(
      assertWithinFileTokenLimit({
        text,
        filename: 'fox.txt',
        fileTokenLimit: tokenCount,
        tokenCountFn: countTokens,
      }),
    ).resolves.toBeUndefined();
    await expect(
      assertWithinFileTokenLimit({
        text,
        filename: 'fox.txt',
        fileTokenLimit: tokenCount - 1,
        tokenCountFn: countTokens,
      }),
    ).rejects.toThrow('exceeds token limit');
  });
});
