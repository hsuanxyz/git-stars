import { Component, OnInit, ViewChild } from '@angular/core';
import { GithubService } from './services/github/github.service';
import { GithubStar } from './models/github-star';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SetStars } from './actions/github-stars.actions';
import { MatDialog } from '@angular/material';
import { BindUserDialogComponent } from './components/bind-user-dialog/bind-user-dialog.component';
import { GithubUser } from './models/github-user';
import { SetUser } from './actions/github-user.actions';
import { DndChipComponent } from './components/dnd-chip/dnd-chip.component';
import { MatDialogRef } from '@angular/material/dialog/typings/dialog-ref';

interface AppState {
  stars: GithubStar[];
  user: GithubUser;
}

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  stars: Observable<GithubStar[]>;
  user: Observable<GithubUser>;
  username = '';
  dialogRef: MatDialogRef<BindUserDialogComponent>;
  @ViewChild(DndChipComponent) dndComponent: DndChipComponent;

  constructor(
    private github: GithubService,
    private store: Store<AppState>,
    public dialog: MatDialog) {
    this.stars = this.store.select('stars');
    this.user = this.store.select('user');
  }

  ngOnInit() {
    if (this.username) {
      this.getUser();
      this.getStars();
    } else {
      this.openBindUserDialog();
    }

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
    if (this.dialogRef) {
      this.dialogRef.close();
    }
     this.dialogRef = this.dialog.open(BindUserDialogComponent, {
      width: '256px',
      data: {
        username: this.username
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'string' && result && result.toLowerCase() !== this.username.toLowerCase()) {
        this.username = result;
        this.getUser();
        this.getStars();
      }
    });
  }

  onRefresh($event) {
    if ($event && $event.toLowerCase() === this.username.toLowerCase()) {
      this.getStars();
    }
  }

  onDragStart($event: any) {
  }

  onDrag($event) {
    const x = `${$event.ref.clientX - this.dndComponent.WIDTH / 2}px`;
    const y  = `${$event.ref.clientY - this.dndComponent.HEIGHT / 2}px`;
    this.dndComponent.nativeElement.style.transform = `translate(${x}, ${y})`;
  }

}
