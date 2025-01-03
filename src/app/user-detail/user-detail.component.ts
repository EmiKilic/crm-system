import { Component } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.class';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatIcon,
    MatMenuModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId = '';
  user: User = new User();
  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap) => {
      this.userId = paraMap.get('id') ?? '';
      console.log('Got Id', this.userId);
      this.getUser();
    });
  }

  getUser() {
    const userDoc = doc(this.firestore, `users/${this.userId}`);
    this.subscription = docData(userDoc).subscribe((user) => {
      this.user = new User(user);
      console.log('Received User', this.user);
    });
  }

  editMenu() {
    const dialog = this.dialogRef.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialogRef.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
