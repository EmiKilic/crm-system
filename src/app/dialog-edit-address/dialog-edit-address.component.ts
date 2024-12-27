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
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

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
  userId:string = '';
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: Firestore) {
    this.user = new User();
  }

  

  async saveUser() {
    if (!this.userId) {
      console.error('User ID is required to update the user');
      return;
    }

    this.loading = true;
    try {
      const userDocRef = doc(this.firestore, `users/${this.userId}`);
      await updateDoc(userDocRef, this.user.toJSON());
      console.log('User updated successfully');
      this.dialogRef.close(); // Close the dialog after a successful update
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      this.loading = false;
    }
  }
}
