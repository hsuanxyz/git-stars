import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { StarsListComponent } from './stars-list/stars-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FolderNodeComponent } from './folder-node/folder-node.component';
import { DndChipComponent } from './dnd-chip/dnd-chip.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    StarsListComponent,
    SidebarComponent,
    FolderNodeComponent,
    DndChipComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
