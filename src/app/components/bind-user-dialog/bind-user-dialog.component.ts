import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'gs-bind-user-dialog',
  templateUrl: './bind-user-dialog.component.html',
  styleUrls: ['./bind-user-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BindUserDialogComponent implements OnInit {

  username: string;

  constructor(
    public dialogRef: MatDialogRef<BindUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.username = data.username;
  }

  ngOnInit() {
  }

  onEnter() {
    this.dialogRef.close(this.username);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
