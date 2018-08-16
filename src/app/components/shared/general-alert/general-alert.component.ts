import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-general-alert',
  templateUrl: './general-alert.component.html',
  styleUrls: ['./general-alert.component.scss']
})
export class GeneralAlertComponent implements OnInit {
  message: string;
  buttons = new EventEmitter();
  public dataInput: {
    header: string;
    subHeader?: string;
    body: string;
    hideButtonCancel?: boolean;
  };
  constructor(
    public dialogRef: MatDialogRef<GeneralAlertComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      header: string;
      subHeader?: string;
      body: string;
      hideButtonCancel?: boolean;
    }
  ) {
    this.dataInput = data;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buttonsResponse(options: string) {
    this.buttons.emit(options);
  }

  ngOnInit() {}
}
