import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GithubStar } from '../../models/github/github-star';

@Component({
  selector: 'gs-stars-list',
  templateUrl: './stars-list.component.html',
  styleUrls: ['./stars-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarsListComponent implements OnInit {

  @Input() stars: GithubStar[];

  constructor() { }

  ngOnInit() {
  }

}
