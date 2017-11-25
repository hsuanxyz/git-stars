import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GithubUser } from '../../models/github/github-user';

@Component({
  selector: 'gs-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ToolbarComponent implements OnInit {

  @Input() user: GithubUser;

  get userAvatar() {

    return this.user && `${this.user.avatar_url}&s=80` || '';
  }

  get username() {
    return this.user.name;
  }

  constructor() { }

  ngOnInit() {
  }

}
