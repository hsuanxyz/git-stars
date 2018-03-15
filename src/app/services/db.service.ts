import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { DBGithubUser, GithubUser } from '../models/github-user';
import { map, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { DBGithubRepo, DBGithubRepoItem, GithubRepo } from '../models/github-repo';
import 'rxjs/add/observable/of';

@Injectable()
export class DBService {
  constructor(private db: Database) {
  }

  /**
   * openDB
   * @returns {Observable<IDBDatabase>}
   */
  openDB() {
    return this.db.open('git-stars', 1);
  }

  /**
   * addUser
   * @param {GithubUser} user
   * @returns {Observable<any>}
   */
  addUser(user: GithubUser) {
    const data: DBGithubUser = {
      user,
      id: user.id,
      insertTime: Date.now()
    };
    return this.db.insert('user', [data]);
  }

  /**
   * getUsers
   * @returns {Observable<DBGithubUser[]>}
   */
  getUsers(): Observable<GithubUser[]> {
    return this.db.query('user')
    .pipe(
      toArray(),
      map((users: DBGithubUser[]) => {
        if (Array.isArray(users) && users.length) {
          return users
          .sort((a, b) => b.insertTime - a.insertTime)
          .map((user: DBGithubUser) => user.user);
        } else {
          return [];
        }
      })
    );
  }

  /**
   * insertRepos
   * @param {GithubRepo[]} repos
   * @param {string} username
   * @returns {Observable<any>}
   */
  insertRepos(repos: GithubRepo[], username: string) {
    const data: DBGithubRepo[] = repos.map((repo, index) => {
      const repoForDB: DBGithubRepoItem = repo;
      repoForDB.index = index;
      return {
        index,
        username,
        repo: repoForDB,
        id: repo.id,
        insertTime: Date.now()
      };
    });
    return this.db.insert('repo', data);
  }

  /**
   * getRepos
   * @param {string} username
   * @returns {Observable<GithubRepo[]>}
   */
  getRepos(username: string): Observable<GithubRepo[]> {
    return this.db.query(
      'repo',
      rec => rec.username.toLowerCase() === username.toLowerCase())
    .pipe(
      toArray(),
      map((repos: DBGithubRepo[]) => {
        return repos
        .sort((a, b) => a.index - b.index)
        .map(repo => repo.repo);
      })
    );
  }

}
