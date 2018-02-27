import {
  ChangeDetectionStrategy,
  Component, EventEmitter, Input, OnInit, Output,
  ViewEncapsulation
} from '@angular/core';
import { StarsState } from '../../reducers/github-stars.reducer';

@Component({
  selector: 'gs-stars-list',
  templateUrl: './stars-list.component.html',
  styleUrls: ['./stars-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarsListComponent implements OnInit {

  @Input() stars: StarsState;
  @Input() keywords = '';
  @Output() onDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onDragEnd: EventEmitter<any> = new EventEmitter();
  @Output() onDrag: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
