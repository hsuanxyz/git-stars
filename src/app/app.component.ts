import { Component } from '@angular/core';
import { GithubService } from './services/github/github.service';
import { GithubStar } from './models/github/github-star';

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  stars: GithubStar[];

  constructor(private github: GithubService) {
    this.github.stars({
      username: 'hsuanxyz',
      page: 1,
      perPage: 100
    }).subscribe(res => {
      this.stars = res;
    });
  }

  obj2class(obj: Object) {
    const keys = Object.keys(obj);
    let classStr = '';
    keys.forEach(e => {
      classStr += `${e}: ${typeof obj[e]}; \n`;
    });

    console.log(classStr);
  }
}
