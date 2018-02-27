import { Component, OnInit, ViewChild } from '@angular/core';
import { GithubService } from './services/github/github.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { StarsLoad, StarsLoading } from './actions/github-stars.actions';
import { MatDialog } from '@angular/material';
import { BindUserDialogComponent } from './components/bind-user-dialog/bind-user-dialog.component';
import { GithubUser } from './models/github-user';
import { SetUser } from './actions/github-user.actions';
import { DndChipComponent } from './components/dnd-chip/dnd-chip.component';
import { MatDialogRef } from '@angular/material/dialog/typings/dialog-ref';
import { StarsState } from './reducers/github-stars.reducer';
import { DBService } from './services/db.service';
import { GithubRepo } from "./models/github-repo";

interface AppState {
  stars: StarsState;
  user: GithubUser;
}

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  stars: Observable<StarsState>;
  dndRepo: GithubRepo | null = null;
  user: Observable<GithubUser>;
  username = '';
  dialogRef: MatDialogRef<BindUserDialogComponent>;
  @ViewChild(DndChipComponent) dndComponent: DndChipComponent;

  constructor(
    private github: GithubService,
    private store: Store<AppState>,
    private db: DBService,
    public dialog: MatDialog) {
    this.stars = this.store.select('stars');
    this.user = this.store.select('user');
  }

  ngOnInit() {
    this.dndComponent.nativeElement.style.visibility = 'hidden';
    this.db.openDB()
    .subscribe(e => {
      this.db.getUsers()
      .subscribe(users => {
        const user = users[0] ? users[0].user : null;
        if (user) {
          this.username = user.login;
          this.store.dispatch(new SetUser(user));
          this.getStars();
        } else {
          setTimeout(() => this.openBindUserDialog(), 0);
        }
      });
    });
  }

  getStars(useLocalDB = true) {
    this.store.dispatch(new StarsLoading('loading'));
    const starsSubscriber = this.github.stars(this.username, useLocalDB).subscribe(res => {
      starsSubscriber.unsubscribe();
      this.store.dispatch(new StarsLoad(res));
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
      console.log(this.username);
      if (typeof result === 'string' && result && result.toLowerCase() !== this.username.toLowerCase()) {
        this.username = result;
        this.getUser();
        this.getStars(false);
      }
    });
  }

  onRefresh($event) {
    if ($event && $event.toLowerCase() === this.username.toLowerCase()) {
      this.getStars(false);
    }
  }

  onDragStart($event: any) {
    this.dndComponent.nativeElement.style.visibility = 'unset';
  }

  onDragEnd($event: any) {
    this.dndComponent.nativeElement.style.visibility = 'hidden';
  }

  onDrag($event) {
    this.setDndRepo($event.star);
    const x = `${$event.ref.clientX - this.dndComponent.WIDTH / 2}px`;
    const y  = `${$event.ref.clientY - this.dndComponent.HEIGHT / 2}px`;
    this.dndComponent.nativeElement.style.transform = `translate(${x}, ${y})`;
  }

  setDndRepo(repo: GithubRepo) {
    if (!this.dndRepo || this.dndRepo.id !== repo.id) {
      this.dndRepo = repo;
    }
  }

}
