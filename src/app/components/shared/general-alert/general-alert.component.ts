import {
  Component,
  OnInit,
  Inject,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-general-alert',
  templateUrl: './general-alert.component.html',
  styleUrls: ['./general-alert.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralAlertComponent implements OnInit {
  message: string;
  buttons = new EventEmitter();
  ratingResult = new EventEmitter();
  statusChange = new EventEmitter();
  statusTicket: string;
  private ratingStars;
  public dataInput: {
    header: string;
    subHeader?: string;
    body: string;
    hideButtonCancel?: boolean;
    isRating?: boolean;
    isform?: boolean;
  };
  constructor(
    public dialogRef: MatDialogRef<GeneralAlertComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      header: string;
      subHeader?: string;
      body: string;
      hideButtonCancel?: boolean;
      isRating?: boolean;
      isform?: boolean;
    }
  ) {
    this.dataInput = data;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buttonsResponse(options: string) {
    this.buttons.emit(options);
    if (options === 'ok') {
      this.ratingResult.emit(this.ratingStars);
      this.statusChange.emit(this.statusTicket);
    }
  }
  ratingResponse(rating) {
    this.ratingStars = rating;
  }

  ngOnInit() {}
}
