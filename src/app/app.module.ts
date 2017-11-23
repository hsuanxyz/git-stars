import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

import { MatIconModule, MatButtonModule, MatCardModule } from '@angular/material';

import { TreeModule } from 'angular-tree-component';
import { StarsItemComponent } from './components/stars-item/stars-item.component';
import { GithubService } from './services/github/github.service';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MapLanguageIcoPipe } from './pipes/map-language-ico.pipe';
import { LanguageIcoComponent } from './components/language-ico/language-ico.component';

import { githubStarsReducer } from './reducers/github-stars.reducer';

const  MAT_MODULES = [MatIconModule, MatButtonModule, MatCardModule];

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
    LanguageIcoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LazyLoadImageModule,
    AppRoutingModule,
    ...MAT_MODULES,
    TreeModule,
    StoreModule.forRoot({
      stars: githubStarsReducer
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
