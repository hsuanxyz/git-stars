import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { StarsItemComponent } from '../stars-item/stars-item.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'gs-stars-list',
  templateUrl: './stars-list.component.html',
  styleUrls: ['./stars-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarsListComponent implements OnInit, AfterContentChecked {

  @Input() loading: boolean;
  @ContentChildren(StarsItemComponent) items: QueryList<StarsItemComponent>;
  lengthChange: Subject<number> = new Subject();
  itemLength = 0;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.lengthChange.subscribe(length => {
      this.itemLength = length;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngAfterContentChecked(): void {
    if (this.itemLength !== this.items.length) {
      this.lengthChange.next(this.items.length);
    }
  }

}
