import { Pipe, PipeTransform } from '@angular/core';
import { GithubRepo } from '../models/github-repo';

/**
 * 用于库的排序
 */
@Pipe({name: 'repoSort'})
export class RepoSortPipe implements PipeTransform {
  transform(allRepos: GithubRepo[], sort: string): GithubRepo[] {
    switch (sort) {
      case 'star-date':
        return allRepos.sort((a, b) => a.index - b.index);

      case 'most-stars':
        return allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);

      case 'most-fork':
        return allRepos.sort((a, b) => b.forks_count - a.forks_count);

      case 'last-active':
        return allRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

      default:
        return allRepos;
    }
  }
}
