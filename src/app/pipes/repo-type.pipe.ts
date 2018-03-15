import { Pipe, PipeTransform } from '@angular/core';
import { GithubRepo } from '../models/github-repo';

/**
 * 用于库的类型筛选
 */
@Pipe({name: 'repoTypeFilter'})
export class RepoTypePipe implements PipeTransform {

  static filter(repo: GithubRepo, type: string): boolean {
    if (type === '' || type === '#ALL') {
      return true;
    } else {
      return repo.owner.type === type;
    }
  }

  transform(allRepos: GithubRepo[], type: string): GithubRepo[] {
    // Organization | User
    return allRepos.filter((repo) => RepoTypePipe.filter(repo, type));
  }
}
