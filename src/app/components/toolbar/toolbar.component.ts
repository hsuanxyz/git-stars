import { Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { GithubUser } from '../../models/github/github-user';

@Component({
  selector: 'gs-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ToolbarComponent implements OnInit {

  @Input() user: GithubUser;
  @Output() refresh: EventEmitter<string> = new EventEmitter();

  get userAvatar() {

    return this.user && `${this.user.avatar_url}&s=80` || '';
  }

  get username() {
    return this.user.login;
  }

  constructor() { }

  ngOnInit() {
  }

  onRefresh() {
    this.refresh.emit(this.username);
  }
}
