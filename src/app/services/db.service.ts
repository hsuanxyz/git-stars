import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { GithubUser } from '../models/github-user';
import { map, toArray } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GithubStar } from '../models/github-star';
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
    const data = {
      user,
      id: user.id,
      insertTime: Date.now()
    };
    return this.db.insert('user', [data]);
  }

  getUsers() {
    return this.db.query('user')
    .pipe(
      toArray(),
      map((users: any[]) => {
        if (Array.isArray(users) && users.length) {
          return users.sort((a, b) => b.insertTime - a.insertTime);
        } else {
          return [];
        }
      })
    );
  }

  insertRepos(repos: GithubStar[], username: string) {
    const data = repos.map(repo => ({
      repo,
      username,
      id: repo.id,
      insertTime: Date.now()
    }));
    return this.db.insert('repo', data);
  }

  /**
   *
   * @param {string} username
   * @returns {Observable<GithubStar[]>}
   */
  getRepos(username: string): Observable<GithubStar[]> {
    return this.db.query('repo', rec => rec.username.toLowerCase() === username.toLowerCase())
    .pipe(
      toArray(),
      map((repos: any[]) => {
        return repos.map((repo: any) => repo.repo);
      })
    );
  }

}
