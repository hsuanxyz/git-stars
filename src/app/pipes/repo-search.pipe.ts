import { Pipe, PipeTransform } from '@angular/core';
import { GithubRepo } from '../models/github-repo';

/**
 * 用于库的关键字搜索
 */
@Pipe({name: 'repoSearch'})
export class RepoSearchPipe implements PipeTransform {

  static filter(repo: GithubRepo, searchTerm: string) {
    const term = searchTerm.toLowerCase();
    const content = (repo.name + (repo.description || '')).toLowerCase();
    return content.includes(term);
  }

  transform(allRepos: GithubRepo[], searchTerm: string): GithubRepo[] {
    return allRepos.filter((repo) => RepoSearchPipe.filter(repo, searchTerm));
  }
}
