import { Pipe, PipeTransform } from '@angular/core';
import { DBGithubRepoItem } from '../models/github-repo';
import { ReposFilterSortType } from '../models/repos-filter';

/**
 * 用于库的排序
 */
@Pipe({name: 'repoSort'})
export class RepoSortPipe implements PipeTransform {

  static sortCompare(a: DBGithubRepoItem, b: DBGithubRepoItem, type: ReposFilterSortType): number {
    switch (type) {
      case 'star-date':
        return a.index - b.index;

      case 'most-stars':
        return b.stargazers_count - a.stargazers_count;

      case 'most-fork':
        return b.forks_count - a.forks_count;

      case 'last-active':
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();

      default:
        return 0;
    }
  }

  transform(allRepos: DBGithubRepoItem[], sort: ReposFilterSortType): DBGithubRepoItem[] {
    if (sort as ReposFilterSortType) {
      return allRepos.sort((a, b) => RepoSortPipe.sortCompare(a, b, sort));
    } else {
      return allRepos;
    }
  }
}
