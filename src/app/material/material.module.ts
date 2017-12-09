import { NgModule } from '@angular/core';
import { MatProgressBarModule, MatIconModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatMenuModule } from '@angular/material';

const  MAT_MODULES = [MatProgressBarModule, MatIconModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatMenuModule];

@NgModule({
  imports: [...MAT_MODULES],
  exports: [...MAT_MODULES]
})
export class MaterialModule { }
