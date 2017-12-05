import {
  Component, EventEmitter, Input, OnInit, Output,
  ViewEncapsulation
} from '@angular/core';
import { GithubStar } from '../../models/github-star';

@Component({
  selector: 'gs-stars-list',
  templateUrl: './stars-list.component.html',
  styleUrls: ['./stars-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarsListComponent implements OnInit {

  @Input() stars: GithubStar[];
  @Output() onDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onDrag: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
