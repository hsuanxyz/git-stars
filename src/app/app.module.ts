/**
 * ng module
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { GithubService } from './services/github/github.service';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BindUserDialogComponent } from './components/bind-user-dialog/bind-user-dialog.component';

import { githubStarsReducer } from './reducers/github-stars.reducer';
import { githubUserReducer } from './reducers/github-user.reducer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponentsModule } from './components/app-components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    BindUserDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LazyLoadImageModule,
    AppRoutingModule,
    AppComponentsModule,
    StoreModule.forRoot({
      stars: githubStarsReducer,
      user: githubUserReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    GithubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
