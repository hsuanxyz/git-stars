import { Component } from '@angular/core';
import { GithubService } from './services/github.service';

@Component({
  selector: 'gs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private github: GithubService) {
    this.github.gists({
      name: 'hsuanxyz',
      perPage: 1,
      page: 1
    });
  }
}
