import { Pipe, PipeTransform } from '@angular/core';
import { GithubRepo } from '../models/github-repo';

/**
 * 用于库的编程语言筛选
 */
@Pipe({name: 'repoLanguageFilter'})
export class RepoLanguagePipe implements PipeTransform {

  static filter(repo: GithubRepo, language: string) {
    if (language === '' || language === '#ALL') {
      return true;
    } else if (language === 'Other') {
      return !repo.language;
    } else {
      return repo.language === language;
    }
  }

  transform(allRepos: GithubRepo[], language: string): GithubRepo[] {
    return allRepos.filter((repo) => RepoLanguagePipe.filter(repo, language));
  }

}

