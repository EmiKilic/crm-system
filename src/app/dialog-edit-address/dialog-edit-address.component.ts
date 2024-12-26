import { Component } from '@angular/core';
import { User } from '../../models/user.class';
import { MatProgressBar } from '@angular/material/progress-bar';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-edit-address',
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
    MatButtonModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  user: User;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {
    this.user = new User();
  }

  

  saveUser() {}
}
