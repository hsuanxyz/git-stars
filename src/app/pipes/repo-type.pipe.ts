import { Pipe, PipeTransform } from '@angular/core';
import { GithubRepo } from '../models/github-repo';

/**
 * 用于库的类型筛选
 */
@Pipe({name: 'repoTypeFilter'})
export class RepoTypePipe implements PipeTransform {
  transform(allRepos: GithubRepo[], type: string): GithubRepo[] {
    // Organization | User
    if (type === '' || type === '#ALL') {
      return allRepos;
    } else {
      return allRepos.filter(repo => repo.owner.type === type);
    }
  }
}
