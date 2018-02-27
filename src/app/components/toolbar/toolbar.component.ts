import {
  Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { GithubUser } from '../../models/github-user';

@Component({
  selector: 'gs-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  @Input() user: GithubUser;
  @Output() refresh: EventEmitter<string> = new EventEmitter();
  @Output() replace: EventEmitter<any> = new EventEmitter();
  @Output() toggleCollapsed: EventEmitter<any> = new EventEmitter();
  get userAvatar() {
    return this.user && `${this.user.avatar_url}&s=80` || '';
  }

  get username() {
    return this.user && this.user.login || '';
  }

  constructor() { }

  ngOnInit() {
  }

  onRefresh() {
    this.refresh.emit(this.username);
  }

  onReplace() {
    this.replace.emit();
  }

  onToggleCollapsed() {
    this.toggleCollapsed.emit();
  }
}
