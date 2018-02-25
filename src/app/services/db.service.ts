import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { GithubUser } from '../models/github-user';

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
    return this.db.insert('user', [user]);
  }

}
