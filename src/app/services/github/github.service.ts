import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as parse from 'parse-link-header';

import { GithubUser } from '../../models/github-user';
import { GithubStar } from '../../models/github-star';
import { GithubGist } from '../../models/github-gist';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mergeScan';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { DBService } from '../db.service';


export class PaginationParams {
  username: string;
  perPage: number;
  page: number;
}

@Injectable()
export class GithubService {

  constructor(private http: HttpClient, private db: DBService, ) {
  }


  /**
   * @param {string} username
   * @returns {Observable<GithubUser>}
   */
  user(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`@github/users/${username}`)
    .do(user => {
      this.db.addUser(user)
      .subscribe(_ => {
        return Observable.of(user);
      });
    });
  }

  /**
   * @param {PaginationParams} params
   * @returns {Observable<GithubStar[]>}
   */
  _stars(params: PaginationParams): Observable<GithubStar[]> {
    const {username, perPage, page} = params;
    return this.http.get<GithubStar[]>(`@github/users/${username}/starred?per_page=${perPage}&page=${page}`);
  }

  /**
   * @param {string} username
   * @param {boolean} useLocalDB
   * @returns {Observable<GithubStar[]>}
   */
  stars(username: string, useLocalDB = true) {

    if (useLocalDB) {
      return this.db.getRepos(username);
    }

    return this.getStarredCount(username)
    .mergeMap((count: number) => {
      const paging: Observable<GithubStar[]>[] = [];
      for (let i = 0; i < Math.ceil(count / 100); i++) {
        paging.push(this._stars({ username, page: i, perPage: 100}));
      }
      return Observable.from(paging);
    })
    .concatAll()
    .reduce((totalStars: GithubStar[], stars: GithubStar[]): GithubStar[] => [...totalStars, ...stars])
    .do(stars => {
      this.db.insertRepos(stars, username)
      .subscribe(_ => {
        return Observable.of(stars);
      });
    });
    // .mergeMap((count: number) => Observable.range(1, Math.ceil(count / 100)))
    // .mergeMap((counter: number) => this._stars({ username, page: counter, perPage: 100}))
    // .reduce((totalStars: GithubStar[], stars: GithubStar[]): GithubStar[] => [...totalStars, ...stars]);
  }

  /**
   * @param {PaginationParams} params
   * @returns {Observable<GithubGist[]>}
   */
  gists(params: PaginationParams): Observable<GithubGist[]> {
    const {username, perPage, page} = params;
    return this.http.get<GithubGist[]>(`@github/users/${username}/gists?per_page=${perPage}&page=${page}`);
  }

  /**
   * @param {string} username - Github username
   * @returns {Observable<number>} starred count
   */
  getStarredCount(username: string): Observable<number> {
    return this.http.get(`@github/users/${username}/starred?per_page=1&page=1`, {observe: 'response'})
    .map(res => {
      if (res.headers.has('link')) {
        // from https://github.com/egoist/starred-count/blob/master/index.js#L22
        const parsed = parse(res.headers.get('link'));
        return (parsed && parsed.last) ? parseInt(parsed.last.page, 10) : 0;
      } else {
        throw new Error('not find count');
      }
    })
    .retry(3);
  }
}
