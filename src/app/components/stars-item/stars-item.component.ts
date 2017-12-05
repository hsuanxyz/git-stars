import {
  Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output,
  ViewEncapsulation
} from '@angular/core';
import { GithubStar } from '../../models/github/github-star';

@Component({
  selector: 'gs-stars-item',
  templateUrl: './stars-item.component.html',
  styleUrls: ['./stars-item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarsItemComponent implements OnInit {

  @Input() star: GithubStar;
  @Output() descriptionChange: EventEmitter<any> = new EventEmitter();
  @Output() onDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onDrag: EventEmitter<any> = new EventEmitter();

  _ghostImage = new Image();

  get title(): string {
    return this.star.name;
  }

  get language(): string {
    return this.star.language;
  }

  get description(): string {
    return this.star.description;
  }

  get homepage(): string {
    return this.star.homepage;
  }

  get repoUrl(): string {
    return this.star.html_url;
  }

  get ownerAvatar(): string {
    return `${this.star.owner.avatar_url}&s=40`;
  }

  @HostBinding('attr.draggable') draggable = true;

  @HostListener('dragstart', ['$event'])
  _onDragStart($event: any) {
    $event.dataTransfer.setDragImage(this._ghostImage, 0, 0);
    $event.dataTransfer.setData('id', this.star.id);
    this.onDragStart.emit({
      ref: $event,
      star: this.star
    });
  }

  @HostListener('drag', ['$event'])
  _onDrag($event: any) {
    this.onDrag.emit({
      ref: $event,
      star: this.star
    })
  }

  constructor() { }

  ngOnInit() {
    this._ghostImage.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
  }

}
