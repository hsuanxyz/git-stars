import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { GithubUser } from '../models/github-user';
import { last, map, toArray } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

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

}
