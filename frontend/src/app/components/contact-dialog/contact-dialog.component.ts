import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-dialog',
  template: `
    <h2 mat-dialog-title>Contact Information</h2>
    <mat-dialog-content>
      <p><strong>Contact:</strong> {{ data.contactInfo }}</p>
      <p class="notice">Please be respectful and only contact for legitimate reasons related to the item.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .notice {
      margin-top: 16px;
      font-style: italic;
      color: rgba(0, 0, 0, 0.6);
    }
  `]
})
export class ContactDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contactInfo: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
} 