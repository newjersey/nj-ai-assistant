<<<<<<< HEAD
import { escapeRegExp } from '@librechat/data-schemas';
import { SystemCategories } from 'librechat-data-provider';
import type { IPromptGroupDocument as IPromptGroup } from '@librechat/data-schemas';
import type { Types } from 'mongoose';
import type { PromptGroupsListResponse } from '~/types';
=======
import { SystemCategories } from 'librechat-data-provider';
import type { PromptGroupsListResponse } from '~/types';
import type { StoredId } from './types';
>>>>>>> upstream/main

/**
 * Formats prompt groups for the paginated /groups endpoint response
 */
<<<<<<< HEAD
export function formatPromptGroupsResponse({
=======
export function formatPromptGroupsResponse<T>({
>>>>>>> upstream/main
  promptGroups = [],
  pageNumber,
  pageSize,
  actualLimit,
  hasMore = false,
  after = null,
}: {
<<<<<<< HEAD
  promptGroups: IPromptGroup[];
=======
  promptGroups: T[];
>>>>>>> upstream/main
  pageNumber?: string;
  pageSize?: string;
  actualLimit?: string | number;
  hasMore?: boolean;
  after?: string | null;
<<<<<<< HEAD
}): PromptGroupsListResponse {
=======
}): PromptGroupsListResponse<T> {
>>>>>>> upstream/main
  const currentPage = parseInt(pageNumber || '1');

  // Calculate total pages based on whether there are more results
  // If hasMore is true, we know there's at least one more page
  // We use a high number (9999) to indicate "many pages" since we don't know the exact count
  const totalPages = hasMore ? '9999' : currentPage.toString();

  return {
    promptGroups,
    pageNumber: pageNumber || '1',
    pageSize: pageSize || String(actualLimit) || '10',
    pages: totalPages,
    has_more: hasMore,
    after,
  };
}

/**
<<<<<<< HEAD
 * Creates an empty response for the paginated /groups endpoint
 */
export function createEmptyPromptGroupsResponse({
  pageNumber,
  pageSize,
  actualLimit,
}: {
  pageNumber?: string;
  pageSize?: string;
  actualLimit?: string | number;
}): PromptGroupsListResponse {
  return {
    promptGroups: [],
    pageNumber: pageNumber || '1',
    pageSize: pageSize || String(actualLimit) || '10',
    pages: '0',
    has_more: false,
    after: null,
  };
}

/**
 * Marks prompt groups as public based on the publicly accessible IDs
 */
export function markPublicPromptGroups(
  promptGroups: IPromptGroup[],
  publiclyAccessibleIds: Types.ObjectId[],
): IPromptGroup[] {
=======
 * Marks prompt groups as public based on the publicly accessible IDs
 */
export function markPublicPromptGroups<T extends { readonly _id?: StoredId }>(
  promptGroups: readonly T[],
  publiclyAccessibleIds: readonly StoredId[],
): T[] {
>>>>>>> upstream/main
  if (!promptGroups.length) {
    return [];
  }

<<<<<<< HEAD
  return promptGroups.map((group) => {
    const isPublic = publiclyAccessibleIds.some((id) => id.equals(group._id?.toString()));
    return isPublic ? ({ ...group, isPublic: true } as IPromptGroup) : group;
  });
}

/**
 * Builds filter object for prompt group queries
 */
export function buildPromptGroupFilter({ name, category }: { name?: string; category?: string }): {
  filter: Record<string, string | number | boolean | RegExp | undefined>;
  searchShared: boolean;
  searchSharedOnly: boolean;
} {
  const filter: Record<string, string | number | boolean | RegExp | undefined> = {};
  let searchShared = true;
  let searchSharedOnly = false;

  // Handle name filter - convert to regex for case-insensitive search
  if (name) {
    filter.name = new RegExp(escapeRegExp(name), 'i');
  }

  // Handle category filters with special system categories
  if (category === SystemCategories.MY_PROMPTS) {
    searchShared = false;
  } else if (category === SystemCategories.NO_CATEGORY) {
    filter.category = '';
  } else if (category === SystemCategories.SHARED_PROMPTS) {
    searchSharedOnly = true;
  } else if (category) {
    filter.category = category;
  }

  return { filter, searchShared, searchSharedOnly };
=======
  const publicIds = new Set(publiclyAccessibleIds.map(String));
  return promptGroups.map((group) =>
    group._id != null && publicIds.has(String(group._id)) ? { ...group, isPublic: true } : group,
  );
}

/**
 * Converts the listing name and category, including system categories, to plain
 * listing inputs and shared-search flags.
 */
export function buildPromptGroupFilter({ name, category }: { name?: string; category?: string }): {
  name?: string;
  category?: string;
  searchShared: boolean;
  searchSharedOnly: boolean;
} {
  let searchShared = true;
  let searchSharedOnly = false;
  let categoryFilter: string | undefined;

  if (category === SystemCategories.MY_PROMPTS) {
    searchShared = false;
  } else if (category === SystemCategories.NO_CATEGORY) {
    categoryFilter = '';
  } else if (category === SystemCategories.SHARED_PROMPTS) {
    searchSharedOnly = true;
  } else if (category) {
    categoryFilter = category;
  }

  return {
    name: name || undefined,
    category: categoryFilter,
    searchShared,
    searchSharedOnly,
  };
>>>>>>> upstream/main
}

/**
 * Filters accessible IDs based on shared/public prompts logic.
 *
 * @param ownedPromptGroupIds - IDs of prompt groups authored by the current user.
 *   Required for correct MY_PROMPTS and SHARED_PROMPTS filtering. When omitted the
 *   function falls back to the legacy behaviour (public-only filtering).
 */
<<<<<<< HEAD
export async function filterAccessibleIdsBySharedLogic({
=======
export async function filterAccessibleIdsBySharedLogic<T extends StoredId>({
>>>>>>> upstream/main
  accessibleIds,
  searchShared,
  searchSharedOnly,
  publicPromptGroupIds,
  ownedPromptGroupIds,
}: {
<<<<<<< HEAD
  accessibleIds: Types.ObjectId[];
  searchShared: boolean;
  searchSharedOnly: boolean;
  publicPromptGroupIds?: Types.ObjectId[];
  ownedPromptGroupIds?: Types.ObjectId[];
}): Promise<Types.ObjectId[]> {
=======
  accessibleIds: readonly T[];
  searchShared: boolean;
  searchSharedOnly: boolean;
  publicPromptGroupIds?: readonly T[];
  ownedPromptGroupIds?: readonly T[];
}): Promise<T[]> {
>>>>>>> upstream/main
  const ownedIdStrings = new Set((ownedPromptGroupIds || []).map((id) => id.toString()));

  if (!searchShared) {
    // MY_PROMPTS — only prompt groups the user authored
    if (ownedPromptGroupIds != null) {
      return accessibleIds.filter((id) => ownedIdStrings.has(id.toString()));
    }
    // Legacy fallback: exclude public IDs (imprecise but backwards-compatible)
    const publicIdStrings = new Set((publicPromptGroupIds || []).map((id) => id.toString()));
    return accessibleIds.filter((id) => !publicIdStrings.has(id.toString()));
  }

  if (searchSharedOnly) {
    // SHARED_PROMPTS — all prompts the user can access that they did NOT author
    // Combine accessible + public, deduplicate, then exclude owned
    const allAccessible = [...accessibleIds, ...(publicPromptGroupIds || [])];
    const uniqueMap = new Map(allAccessible.map((id) => [id.toString(), id]));

    if (ownedPromptGroupIds != null) {
      return [...uniqueMap.values()].filter((id) => !ownedIdStrings.has(id.toString()));
    }
    // Legacy fallback
    if (!publicPromptGroupIds?.length) {
      return [];
    }
    const accessibleIdStrings = new Set(accessibleIds.map((id) => id.toString()));
    return publicPromptGroupIds.filter((id) => accessibleIdStrings.has(id.toString()));
  }

  // ALL — return everything accessible + public (deduplicated)
  const allAccessible = [...accessibleIds, ...(publicPromptGroupIds || [])];
  const uniqueMap = new Map(allAccessible.map((id) => [id.toString(), id]));
  return [...uniqueMap.values()];
}
