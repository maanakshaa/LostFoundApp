import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1 class="mat-display-2">Welcome to Lost & Found</h1>
        <p class="mat-headline-5">
          A place to report lost items or help others find their belongings
        </p>
        
        <div class="cta-buttons">
          <button mat-raised-button color="primary" (click)="navigateTo('/lost-items')">
            <mat-icon>search</mat-icon> Browse Lost Items
          </button>
          <button mat-raised-button color="accent" (click)="navigateTo('/found-items')">
            <mat-icon>check_circle</mat-icon> Browse Found Items
          </button>
        </div>
      </div>

      <div class="features-section">
        <h2 class="mat-headline-4 text-center">How It Works</h2>
        
        <div class="feature-cards">
          <mat-card>
            <mat-card-header>
              <mat-icon mat-card-avatar>report_problem</mat-icon>
              <mat-card-title>Lost Something?</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Report your lost item with details and contact information. Someone might have found it!</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary" (click)="navigateTo('/lost-items/new')">Report Lost Item</button>
            </mat-card-actions>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-icon mat-card-avatar>search</mat-icon>
              <mat-card-title>Looking for Something?</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Browse the list of found items. Filter by category, date, or keyword to find what you're looking for.</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary" (click)="navigateTo('/found-items')">Browse Found Items</button>
            </mat-card-actions>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-icon mat-card-avatar>emoji_objects</mat-icon>
              <mat-card-title>Found Something?</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>Help others by reporting items you've found. Provide details so the owner can identify it.</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-button color="primary" (click)="navigateTo('/found-items/new')">Report Found Item</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .hero-section {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(to right, #3f51b5, #6573c3);
      color: white;
      border-radius: 8px;
      margin-bottom: 40px;
    }

    .cta-buttons {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      gap: 16px;
    }

    .features-section {
      padding: 20px;
    }

    .feature-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }

    mat-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    mat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }

    mat-card-content {
      flex-grow: 1;
    }

    mat-card-actions {
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
} 