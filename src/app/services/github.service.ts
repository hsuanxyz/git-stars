import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GithubService {

  constructor(private http: HttpClient) { }

  user(name: string) {
    this.http.get(`github:users/${name}`)
    .subscribe(res => console.log(res));
  }
}
