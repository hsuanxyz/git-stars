import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gs-language-ico',
  template: `
    <div [class]="languageClass"></div>`,
  styleUrls: ['./language-ico.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageIcoComponent implements OnInit {

  @Input() language: string;

  get languageClass(): string {
    if (this.language) {
      let language = '';
      switch (this.language) {
        case 'C#':
          language = 'csharp';
          break;
        case 'C++':
          language = 'cplusplus';
          break;
        default:
          language = this.language;
      }
      return `languages-ico language-ico-${language.toLowerCase()}`;
    } else {
      return 'languages-ico language-ico-markdown';
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}
