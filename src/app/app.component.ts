import { Component } from '@angular/core';
import { GithubService } from './services/github/github.service';
import { GithubStar } from './models/github/github-star';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SetStars } from './actions/github-stars.actions';

interface AppState {
  stars: GithubStar[];
}

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  stars: Observable<GithubStar[]>;
  starsSubscriber;
  constructor(private github: GithubService, private store: Store<AppState>) {
    this.stars = this.store.select('stars');
    this.getStars();
  }

  getStars() {
    this.starsSubscriber = this.github.stars('hsuanxyz').subscribe(res => {
      this.starsSubscriber.unsubscribe();
      this.store.dispatch(new SetStars(res));
    });
  }

}
