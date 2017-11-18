import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as parse from 'parse-link-header';

import { GithubUser } from '../../models/github/github-user';
import { GithubStar } from '../../models/github/github-star';
import { GithubGist } from '../../models/github/github-gist';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export class PaginationParams {
  username: string;
  perPage: number;
  page: number;
}

@Injectable()
export class GithubService {

  constructor(private http: HttpClient) {
  }


  /**
   * @param {string} username
   * @returns {Observable<GithubUser>}
   */
  user(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`github:users/${username}`);
  }

  /**
   * @param {PaginationParams} params
   * @returns {Observable<GithubStar[]>}
   */
  stars(params: PaginationParams): Observable<GithubStar[]> {
    const {username, perPage, page} = params;
    return this.http.get<GithubStar[]>(`github:users/${username}/starred?per_page=${perPage}&page=${page}`);
  }

  /**
   * @param {PaginationParams} params
   * @returns {Observable<GithubGist[]>}
   */
  gists(params: PaginationParams): Observable<GithubGist[]> {
    const {username, perPage, page} = params;
    return this.http.get<GithubGist[]>(`github:users/${username}/gists?per_page=${perPage}&page=${page}`);
  }

  /**
   * @param {string} username - Github username
   * @returns {Observable<number>} starred count
   */
  getStarredCount(username: string): Observable<number> {
    return this.http.get(`github:users/${username}/starred?per_page=1&page=1`, {observe: 'response'})
    .map(res => {
      if (res.headers.has('link')) {
        // from https://github.com/egoist/starred-count/blob/master/index.js#L22
        const parsed = parse(res.headers.get('link'));
        return (parsed && parsed.last) ? parseInt(parsed.last.page, 10) : 0;
      } else {
        throw new Error('not find count');
      }
    });

  }
}
