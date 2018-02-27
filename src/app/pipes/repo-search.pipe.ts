import { Pipe, PipeTransform } from '@angular/core';
import { GithubRepo } from '../models/github-repo';

/**
 * 用于库的关键字搜索
 */
@Pipe({name: 'repoSearch'})
export class RepoSearchPipe implements PipeTransform {
  transform(allRepos: GithubRepo[], keywords: string): GithubRepo[] {
    const searchTerm = keywords.toLowerCase();
    return allRepos
    .filter(repo => {
      const text = (repo.name + (repo.description || '')).toLowerCase();
      return text.includes(searchTerm);
    });
  }
}
