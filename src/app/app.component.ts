import { Component } from '@angular/core';
import { GithubService } from './services/github/github.service';
import { GithubStar } from './models/github/github-star';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SetStars } from './actions/github-stars.actions';
import { MatDialog } from '@angular/material';
import { BindUserDialogComponent } from './components/bind-user-dialog/bind-user-dialog.component';

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
  username = 'hsuanxyz';

  constructor(
    private github: GithubService,
    private store: Store<AppState>,
    public dialog: MatDialog) {
    this.stars = this.store.select('stars');
    this.getStars();
    this.openBindUserDialog();
  }

  getStars() {
    const starsSubscriber = this.github.stars(this.username).subscribe(res => {
      starsSubscriber.unsubscribe();
      this.store.dispatch(new SetStars(res));
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
        this.getStars();
      }
    });
  }

}
