import type { IPromptGroup as IPromptGroup } from '@librechat/data-schemas';
<<<<<<< HEAD
import type { Types } from 'mongoose';

export interface PromptGroupsListResponse {
  promptGroups: IPromptGroup[];
=======

export interface PromptGroupsListResponse<T = IPromptGroup> {
  promptGroups: T[];
>>>>>>> upstream/main
  pageNumber: string;
  pageSize: string;
  pages: string;
  has_more: boolean;
  after: string | null;
}
<<<<<<< HEAD

export interface PromptGroupsAllResponse {
  data: IPromptGroup[];
}

export interface AccessiblePromptGroupsResult {
  object: 'list';
  data: IPromptGroup[];
  first_id: Types.ObjectId | null;
  last_id: Types.ObjectId | null;
  has_more: boolean;
  after: string | null;
}
=======
>>>>>>> upstream/main
