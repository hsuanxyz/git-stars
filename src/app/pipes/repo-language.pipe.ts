import { Pipe, PipeTransform } from '@angular/core';
import { GithubRepo } from '../models/github-repo';

/**
 * 用于库的编程语言筛选
 */
@Pipe({name: 'repoLanguageFilter'})
export class RepoLanguagePipe implements PipeTransform {
  transform(allRepos: GithubRepo[], language: string): GithubRepo[] {
    if (language === '' || language === '#ALL') {
      return allRepos;
    } else if (language === 'Other') {
      return allRepos
      .filter(repo => !repo.language);
    } else {
      return allRepos
      .filter(repo => repo.language === language);
    }
  }
}
