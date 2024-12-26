import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [
    MatProgressBar,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatHint,
    MatDialogActions,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  user: User;
  loading = false;
  birthDate: Date | null = null;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.user = new User();
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6; // Sunday (0) and Saturday (6)
  };

  saveUser() {}
}
