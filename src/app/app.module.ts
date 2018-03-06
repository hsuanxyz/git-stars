/**
 * ng module
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DBModule } from '@ngrx/db';

import { GithubService } from './services/github/github.service';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BindUserDialogComponent } from './components/bind-user-dialog/bind-user-dialog.component';

import { githubStarsReducer } from './reducers/github-stars.reducer';
import { githubUserReducer } from './reducers/github-user.reducer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponentsModule } from './components/app-components.module';
import { schema } from './db';
import { DBService } from './services/db.service';
import { RepoSearchPipe } from './pipes/repo-search.pipe';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { RepoSortPipe } from './pipes/repo-sort.pipe';
import { RepoLanguagePipe } from './pipes/repo-language.pipe';
import { RepoTypePipe } from './pipes/repo-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RepoSearchPipe,
    RepoSortPipe,
    RepoLanguagePipe,
    RepoTypePipe,
  ],
  entryComponents: [
    BindUserDialogComponent
  ],
  imports: [
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LazyLoadImageModule,
    AppRoutingModule,
    AppComponentsModule,
    MatSelectModule,
    MatFormFieldModule,
    StoreModule.forRoot({
      stars: githubStarsReducer,
      user: githubUserReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    DBModule.provideDB(schema)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    GithubService,
    DBService,
    RepoSearchPipe,
    RepoSortPipe,
    RepoLanguagePipe,
    RepoTypePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
