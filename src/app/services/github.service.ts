import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as parse from 'parse-link-header';
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
   * @returns {Observable<Object>}
   */
  user(username: string) {
    return this.http.get(`github:users/${username}`);
  }

  /**
   * @param {PaginationParams} params
   * @returns {Observable<Object>}
   */
  stars(params: PaginationParams) {
    const {username, perPage, page} = params;
    return this.http.get(`github:users/${username}/starred?per_page=${perPage}&page=${page}`);
  }

  /**
   * @param {PaginationParams} params
   * @returns {Observable<Object>}
   */
  gists(params: PaginationParams) {
    const {username, perPage, page} = params;
    return this.http.get(`github:users/${username}/gists?per_page=${perPage}&page=${page}`);
  }

  /**
   * @param {string} username - Github username
   * @returns {Observable<number>} starred count
   */
  getStarredCount(username: string) {
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
