import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [
    MatIcon,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    NgFor,
    CommonModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  user = new User();
  allUsers: (User & { id: string })[] = []; // Alle Benutzer mit ihrer ID

  constructor(public dialogRef: MatDialog, private firestore: Firestore) {}

  ngOnInit(): void {
    // Sammlung aus Firestore holen
    const usersCollection = collection(this.firestore, 'users');

    // Daten mit ID extrahieren
    collectionData(usersCollection, { idField: 'id' }).subscribe((changes) => {
      console.log('Received changes from DB:', changes);
      this.allUsers = changes as (User & { id: string })[]; // Die ID wird zu jedem Objekt hinzugefügt
    });
  }

  openDialog(): void {
    this.dialogRef.open(DialogAddUserComponent);
  }
}
