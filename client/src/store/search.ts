import { atom } from 'recoil';
import { constRecoilStateOpts } from '~/nj/utils/constRecoilState';

export type SearchState = {
  enabled: boolean | null;
  query: string;
  debouncedQuery: string;
  isSearching: boolean;
  isTyping: boolean;
};

// NJ: Disable the search bar until we actually support search (via Meili)
export const search = atom<SearchState>({
  key: 'search',
  default: {
    enabled: true,
    query: '',
    debouncedQuery: '',
    isSearching: false,
    isTyping: false,
  },
});

export default {
  search,
};
