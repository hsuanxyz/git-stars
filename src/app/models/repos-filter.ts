export class ReposFilter {
  searchTerm = '';
  language = '#ALL';
  type = '#ALL';
  sort: ReposFilterSortType = 'star-date';

  constructor(filter?: ReposFilter) {
    if (filter as ReposFilter) {
      Object.keys(filter).forEach(key => this[key] = filter[key]);
    }
  }
}

export type ReposFilterSortType = 'star-date' | 'last-active' | 'most-stars' | 'most-fork';

