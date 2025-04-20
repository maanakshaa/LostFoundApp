import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button [routerLink]="['/']">
        <mat-icon>find_replace</mat-icon>
      </button>
      <span class="app-title" [routerLink]="['/']">Lost & Found App</span>
      <span class="flex-spacer"></span>
      
      <a mat-button routerLink="/lost-items" routerLinkActive="active-link">
        <mat-icon>search</mat-icon> Lost Items
      </a>
      <a mat-button routerLink="/found-items" routerLinkActive="active-link">
        <mat-icon>check_circle</mat-icon> Found Items
      </a>
      <a mat-raised-button color="accent" routerLink="/lost-items/new">
        <mat-icon>add</mat-icon> Report Lost Item
      </a>
      <a mat-raised-button color="accent" class="report-found" routerLink="/found-items/new">
        <mat-icon>add</mat-icon> Report Found Item
      </a>
    </mat-toolbar>
  `,
  styles: [`
    .app-title {
      margin-left: 8px;
      cursor: pointer;
    }
    .active-link {
      background-color: rgba(255, 255, 255, 0.15);
    }
    .report-found {
      margin-left: 8px;
    }
  `]
})
export class NavbarComponent { } 