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
  starsSubscriber;
  constructor(private github: GithubService) {
    this.getStars();
  }

  getStars() {
    this.starsSubscriber = this.github.stars('hsuanxyz').subscribe(res => {
      this.starsSubscriber.unsubscribe();
      this.stars = res;
    });
  }

}
