import { Component } from '@angular/core';
import { GithubService } from './services/github/github.service';
import { GithubStar } from './models/github/github-star';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SetStars } from './actions/github-stars.actions';
import { MatDialog } from '@angular/material';
import { BindUserDialogComponent } from './components/bind-user-dialog/bind-user-dialog.component';
import { GithubUser } from './models/github/github-user';
import { SetUser } from './actions/github-user.actions';

interface AppState {
  stars: GithubStar[];
  user: GithubUser;
}

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  stars: Observable<GithubStar[]>;
  user: Observable<GithubUser>;
  username = 'hsuanxyz';

  constructor(
    private github: GithubService,
    private store: Store<AppState>,
    public dialog: MatDialog) {
    this.stars = this.store.select('stars');
    this.user = this.store.select('user');

    this.getUser();
    this.getStars();
    this.openBindUserDialog();
  }

  getStars() {
    const starsSubscriber = this.github.stars(this.username).subscribe(res => {
      starsSubscriber.unsubscribe();
      this.store.dispatch(new SetStars(res));
    });
  }

  getUser() {
    const userSubscriber = this.github.user(this.username).subscribe(res => {
      userSubscriber.unsubscribe();
      this.store.dispatch(new SetUser(res));
    });
  }

  openBindUserDialog() {
    const dialogRef = this.dialog.open(BindUserDialogComponent, {
      width: '256px',
      data: {
        username: this.username
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'string' && result && result.toLowerCase() !== this.username.toLowerCase()) {
        this.username = result;
        this.getUser();
        this.getStars();
      }
    });
  }

}
