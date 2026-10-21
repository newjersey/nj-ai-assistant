import React from 'react';
<<<<<<< HEAD
import { Tools } from 'librechat-data-provider';
import { UIResourceRenderer } from '@mcp-ui/client';
import { render, screen, fireEvent } from '@testing-library/react';
import type { TAttachment } from 'librechat-data-provider';
import UIResourceCarousel from '~/components/Chat/Messages/Content/UIResourceCarousel';
import ToolCallInfo from '~/components/Chat/Messages/Content/ToolCallInfo';

// Mock the dependencies
=======
import { render, screen, fireEvent } from '@testing-library/react';
import ToolCallInfo from '~/components/Chat/Messages/Content/ToolCallInfo';

>>>>>>> upstream/main
jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => {
    const translations: Record<string, string> = {
      com_ui_parameters: 'Parameters',
    };
    return translations[key] || key;
  },
  useExpandCollapse: (isExpanded: boolean) => ({
    style: {
      display: 'grid',
      gridTemplateRows: isExpanded ? '1fr' : '0fr',
      opacity: isExpanded ? 1 : 0,
    },
    ref: { current: null },
  }),
}));

<<<<<<< HEAD
jest.mock('~/Providers', () => ({
  useOptionalMessagesOperations: () => ({
    ask: jest.fn(),
  }),
}));

jest.mock('@mcp-ui/client', () => ({
  UIResourceRenderer: jest.fn(() => null),
}));

jest.mock('../UIResourceCarousel', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

=======
>>>>>>> upstream/main
jest.mock('../ToolOutput', () => ({
  OutputRenderer: ({ text }: { text: string }) => <div data-testid="output-renderer">{text}</div>,
}));

jest.mock('~/utils', () => ({
<<<<<<< HEAD
  handleUIAction: jest.fn(),
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

jest.mock('lucide-react', () => ({
  ChevronDown: () => <span>{'ChevronDown'}</span>,
}));

describe('ToolCallInfo', () => {
  const mockProps = {
    input: '{"test": "input"}',
  };
=======
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

jest.mock('lucide-react', () => ({
  ChevronDown: () => <span aria-hidden="true" />,
}));

describe('ToolCallInfo', () => {
  const baseProps = { input: '{"query": "test"}' };
>>>>>>> upstream/main

  beforeEach(() => {
    jest.clearAllMocks();
  });

<<<<<<< HEAD
  describe('ui_resources from attachments', () => {
    it('should render single ui_resource from attachments', () => {
      const uiResource = {
        resourceId: 'resource-1',
        uri: 'ui://test/resource-1',
        mimeType: 'text/html',
        text: 'Test resource',
      };

      const attachments: TAttachment[] = [
        {
          type: Tools.ui_resources,
          messageId: 'msg123',
          toolCallId: 'tool456',
          conversationId: 'conv789',
          [Tools.ui_resources]: [uiResource] as any,
        },
      ];

      render(<ToolCallInfo {...mockProps} output="Some output" attachments={attachments} />);

      // Should render UIResourceRenderer for single resource
      expect(UIResourceRenderer).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: uiResource,
          onUIAction: expect.any(Function),
          htmlProps: {
            autoResizeIframe: { width: true, height: true },
          },
        }),
        expect.any(Object),
      );

      // Should not render carousel for single resource
      expect(UIResourceCarousel).not.toHaveBeenCalled();
    });

    it('should render carousel for multiple ui_resources from attachments', () => {
      const attachments: TAttachment[] = [
        {
          type: Tools.ui_resources,
          messageId: 'msg1',
          toolCallId: 'tool1',
          conversationId: 'conv1',
          [Tools.ui_resources]: [
            {
              resourceId: 'resource-1',
              uri: 'ui://test/resource-1',
              mimeType: 'text/html',
              text: 'Resource 1',
            },
            {
              resourceId: 'resource-2',
              uri: 'ui://test/resource-2',
              mimeType: 'text/html',
              text: 'Resource 2',
            },
            {
              resourceId: 'resource-3',
              uri: 'ui://test/resource-3',
              mimeType: 'text/html',
              text: 'Resource 3',
            },
          ],
        },
      ];

      render(<ToolCallInfo {...mockProps} output="Some output" attachments={attachments} />);

      // Should render carousel for multiple resources
      expect(UIResourceCarousel).toHaveBeenCalledWith(
        expect.objectContaining({
          uiResources: [
            expect.objectContaining({ resourceId: 'resource-1' }),
            expect.objectContaining({ resourceId: 'resource-2' }),
            expect.objectContaining({ resourceId: 'resource-3' }),
          ],
        }),
        expect.any(Object),
      );

      // Should not render individual UIResourceRenderer
      expect(UIResourceRenderer).not.toHaveBeenCalled();
    });

    it('renders a single supported resource without carousel layout', () => {
      const attachments: TAttachment[] = [
        {
          type: Tools.ui_resources,
          messageId: 'msg1',
          toolCallId: 'tool1',
          conversationId: 'conv1',
          [Tools.ui_resources]: [
            {
              resourceId: 'blocked-resource',
              uri: 'ui://test/blocked',
              mimeType: 'application/vnd.mcp-ui.remote-dom+javascript',
              text: 'malicious script',
            },
            {
              resourceId: 'html-resource',
              uri: 'ui://test/html',
              mimeType: 'text/html',
              text: '<p>Supported</p>',
            },
          ],
        },
      ];

      render(<ToolCallInfo {...mockProps} attachments={attachments} />);

      expect(UIResourceRenderer).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: expect.objectContaining({ resourceId: 'html-resource' }),
        }),
        expect.any(Object),
      );
      expect(UIResourceCarousel).not.toHaveBeenCalled();
    });

    it('omits the resource section when every resource is blocked', () => {
      const attachments: TAttachment[] = [
        {
          type: Tools.ui_resources,
          messageId: 'msg1',
          toolCallId: 'tool1',
          conversationId: 'conv1',
          [Tools.ui_resources]: [
            {
              resourceId: 'blocked-resource',
              uri: 'ui://test/blocked',
              mimeType: 'text/uri-list',
              text: 'https://example.com',
            },
          ],
        },
      ];

      render(<ToolCallInfo input="" attachments={attachments} />);

      expect(UIResourceRenderer).not.toHaveBeenCalled();
      expect(UIResourceCarousel).not.toHaveBeenCalled();
    });

    it('should handle no attachments', () => {
      render(<ToolCallInfo {...mockProps} output="Some output" />);

      expect(UIResourceRenderer).not.toHaveBeenCalled();
      expect(UIResourceCarousel).not.toHaveBeenCalled();
    });

    it('should handle empty attachments array', () => {
      render(<ToolCallInfo {...mockProps} attachments={[]} />);

      expect(UIResourceRenderer).not.toHaveBeenCalled();
      expect(UIResourceCarousel).not.toHaveBeenCalled();
    });

    it('should handle attachments with non-ui_resources type', () => {
      const attachments: TAttachment[] = [
        {
          type: Tools.web_search as any,
          messageId: 'msg123',
          toolCallId: 'tool456',
          conversationId: 'conv789',
          [Tools.web_search]: {
            organic: [],
          },
        },
      ];

      render(<ToolCallInfo {...mockProps} attachments={attachments} />);

      expect(UIResourceRenderer).not.toHaveBeenCalled();
      expect(UIResourceCarousel).not.toHaveBeenCalled();
    });
  });

  describe('rendering logic', () => {
    it('should render output when provided', () => {
      render(<ToolCallInfo {...mockProps} output="Some output" />);

      expect(screen.getByTestId('output-renderer')).toBeInTheDocument();
      expect(screen.getByTestId('output-renderer').textContent).toBe('Some output');
    });

    it('should render parameters toggle when input has JSON content', () => {
      render(<ToolCallInfo {...mockProps} output="Some output" />);

      expect(screen.getByText('Parameters')).toBeInTheDocument();
    });

    it('should not render parameters toggle when input is empty', () => {
      render(<ToolCallInfo input="" output="Some output" />);

      expect(screen.queryByText('Parameters')).not.toBeInTheDocument();
    });

    it('should toggle parameters visibility when clicking', () => {
      render(<ToolCallInfo {...mockProps} output="Some output" />);

      const paramsButton = screen.getByText('Parameters');
      expect(paramsButton.closest('button')).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(paramsButton.closest('button')!);
      expect(paramsButton.closest('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('should render ui_resources section when attachments have ui_resources', () => {
      const attachments: TAttachment[] = [
        {
          type: Tools.ui_resources,
          messageId: 'msg123',
          toolCallId: 'tool456',
          conversationId: 'conv789',
          [Tools.ui_resources]: [
            {
              resourceId: 'resource-1',
              uri: 'ui://test/resource-1',
              mimeType: 'text/html',
              text: 'Test',
            },
          ],
        },
      ];

      render(<ToolCallInfo {...mockProps} output="Some output" attachments={attachments} />);

      expect(UIResourceRenderer).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: expect.objectContaining({ resourceId: 'resource-1', text: 'Test' }),
        }),
        expect.any(Object),
      );
    });
  });

  describe('backward compatibility', () => {
    it('should handle output with ui_resources metadata (ignored — uses attachments)', () => {
      const output = JSON.stringify([
        { type: 'text', text: 'Regular output' },
        {
          metadata: {
            type: 'ui_resources',
            data: [{ type: 'text', data: 'UI Resource' }],
          },
        },
      ]);

      render(<ToolCallInfo {...mockProps} output={output} />);

      // Since we now use attachments, ui_resources in output should be ignored
      expect(UIResourceRenderer).not.toHaveBeenCalled();
      expect(UIResourceCarousel).not.toHaveBeenCalled();
    });

    it('should prioritize attachments over output ui_resources', () => {
      const attachments: TAttachment[] = [
        {
          type: Tools.ui_resources,
          messageId: 'msg123',
          toolCallId: 'tool456',
          conversationId: 'conv789',
          [Tools.ui_resources]: [
            {
              resourceId: 'attachment-resource',
              uri: 'ui://test/attachment-resource',
              mimeType: 'text/html',
              text: 'From attachments',
            },
          ],
        },
      ];

      const output = JSON.stringify([
        {
          metadata: {
            type: 'ui_resources',
            data: [{ type: 'output', data: 'From output' }],
          },
        },
      ]);

      render(<ToolCallInfo {...mockProps} output={output} attachments={attachments} />);

      // Should use attachments, not output
      expect(UIResourceRenderer).toHaveBeenCalledWith(
        expect.objectContaining({
          resource: expect.objectContaining({
            resourceId: 'attachment-resource',
            text: 'From attachments',
          }),
        }),
        expect.any(Object),
      );
=======
  describe('output rendering', () => {
    it('renders output text', () => {
      render(<ToolCallInfo {...baseProps} output="Some output" />);
      expect(screen.getByTestId('output-renderer').textContent).toBe('Some output');
    });

    it('renders nothing when output is absent', () => {
      render(<ToolCallInfo {...baseProps} />);
      expect(screen.queryByTestId('output-renderer')).not.toBeInTheDocument();
    });

    it('renders null output without crashing', () => {
      render(<ToolCallInfo {...baseProps} output={null} />);
      expect(screen.queryByTestId('output-renderer')).not.toBeInTheDocument();
    });
  });

  describe('parameters toggle', () => {
    it('shows toggle when input has JSON content', () => {
      render(<ToolCallInfo {...baseProps} output="output" />);
      expect(screen.getByText('Parameters')).toBeInTheDocument();
    });

    it('hides toggle when input is empty', () => {
      render(<ToolCallInfo input="" output="output" />);
      expect(screen.queryByText('Parameters')).not.toBeInTheDocument();
    });

    it('hides toggle when input is whitespace only', () => {
      render(<ToolCallInfo input="   " output="output" />);
      expect(screen.queryByText('Parameters')).not.toBeInTheDocument();
    });

    it('toggles expanded state when clicked', () => {
      render(<ToolCallInfo {...baseProps} output="output" />);
      const button = screen.getByText('Parameters').closest('button')!;
      expect(button).toHaveAttribute('aria-expanded', 'false');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('edge cases', () => {
    it('renders with only input and no output', () => {
      render(<ToolCallInfo {...baseProps} />);
      expect(screen.getByText('Parameters')).toBeInTheDocument();
    });

    it('renders with empty props', () => {
      render(<ToolCallInfo input="" />);
      expect(screen.queryByTestId('output-renderer')).not.toBeInTheDocument();
      expect(screen.queryByText('Parameters')).not.toBeInTheDocument();
>>>>>>> upstream/main
    });
  });
});
