import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { TreeModule } from 'angular-tree-component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { StarsListComponent } from './stars-list/stars-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FolderNodeComponent } from './folder-node/folder-node.component';
import { DndChipComponent } from './dnd-chip/dnd-chip.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { StarsItemComponent } from './stars-item/stars-item.component';
import { LanguageIcoComponent } from './language-ico/language-ico.component';
import { BindUserDialogComponent } from './bind-user-dialog/bind-user-dialog.component';
import { RepoSearchPipe } from '../pipes/repo-search.pipe';
import { HighlightPipe } from '../pipes/highlight.pipe';


const APP_COMPONENTS = [
  ToolbarComponent,
  StarsListComponent,
  SidebarComponent,
  FolderNodeComponent,
  DndChipComponent,
  StarsItemComponent,
  LanguageIcoComponent,
  BindUserDialogComponent
];

@NgModule({
  imports: [CommonModule, MaterialModule, TreeModule, LazyLoadImageModule, FormsModule],
  exports: [...APP_COMPONENTS],
  declarations: [...APP_COMPONENTS, RepoSearchPipe, HighlightPipe],
  entryComponents: [
    BindUserDialogComponent
  ],
  providers: [RepoSearchPipe, HighlightPipe]
})
export class AppComponentsModule { }
