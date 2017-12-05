import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gs-dnd-chip',
  templateUrl: './dnd-chip.component.html',
  styleUrls: ['./dnd-chip.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DndChipComponent implements OnInit {
  WIDTH = 172;
  HEIGHT = 40;
  @ViewChild('dnd') dndWrap: ElementRef;
  get nativeElement() {
    return this.dndWrap.nativeElement;
  }

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.nativeElement.style.display = 'flex';
  }

  hide() {
    this.nativeElement.style.display = 'none';
  }

}
