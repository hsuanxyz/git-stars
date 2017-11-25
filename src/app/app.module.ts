import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StarsListComponent } from './components/stars-list/stars-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FolderNodeComponent } from './components/folder-node/folder-node.component';
import { DndChipComponent } from './components/dnd-chip/dnd-chip.component';

import { MatIconModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule } from '@angular/material';

import { TreeModule } from 'angular-tree-component';
import { StarsItemComponent } from './components/stars-item/stars-item.component';
import { GithubService } from './services/github/github.service';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MapLanguageIcoPipe } from './pipes/map-language-ico.pipe';
import { LanguageIcoComponent } from './components/language-ico/language-ico.component';
import { BindUserDialogComponent } from './components/bind-user-dialog/bind-user-dialog.component';

import { githubStarsReducer } from './reducers/github-stars.reducer';
import { githubUserReducer } from './reducers/github-user.reducer';

const  MAT_MODULES = [MatIconModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    StarsListComponent,
    SidebarComponent,
    FolderNodeComponent,
    DndChipComponent,
    StarsItemComponent,
    MapLanguageIcoPipe,
    LanguageIcoComponent,
    BindUserDialogComponent
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
    ...MAT_MODULES,
    TreeModule,
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
