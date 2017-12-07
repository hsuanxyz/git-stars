import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  private BASE_URLS = {
    '@github': 'https://api.github.com'
  };

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: this.parseURL(req.url)});
    return next.handle(apiReq);
  }

  parseURL(url: string): string {
    const sources = Object.keys(this.BASE_URLS);
    for (let i = 0; i < sources.length; i++) {
      const source = `${sources[i]}`;
      if (url.indexOf(source) !== -1) {
        return url.replace(source, this.BASE_URLS[sources[i]]);
      }
    }
  }

}
