import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddUserComponent {
  user = new User();
  birthDate: Date | null = null;

  constructor(private firestore: Firestore) {}

  async saveUser() {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
      console.log('current user is', this.user);
    } else {
      console.log('Birth date is not set!');
      return;
    }

    try {
      // Use collection() and addDoc() for modern Firestore API
      const usersCollection = collection(this.firestore, 'users');
      const result = await addDoc(usersCollection, { ...this.user.toJSON() });
      console.log('User added successfully:', result.id);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  /**
   * Filters out weekends (Saturday and Sunday) from the datepicker.
   */
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6; // Sunday (0) and Saturday (6)
  };
}
