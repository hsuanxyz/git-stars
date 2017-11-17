import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GithubService {

  constructor(private http: HttpClient) { }

  user(name: string) {
    this.http.get(`github:users/${name}`)
    .subscribe(res => console.log(res));
  }

  stars(params: { name: string; perPage: number; page: number }) {
    const { name, perPage, page } = params;
    this.http.get(`github:users/${name}/starred?per_page=${perPage}&page=${page}`)
    .subscribe(res => console.log(res));
  }

  gists(params: { name: string; perPage: number; page: number }) {
    const { name, perPage, page } = params;
    this.http.get(`github:users/${name}/gists?per_page=${perPage}&page=${page}`)
    .subscribe(res => console.log(res));
  }
}
