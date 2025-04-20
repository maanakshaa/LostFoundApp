import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LostItem, FoundItem } from '../../models/item.model';
import { LostItemService } from '../../services/lost-item.service';
import { FoundItemService } from '../../services/found-item.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-item-details',
  template: `
    <div class="container" *ngIf="!loading && item">
      <div class="page-header">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1 class="mat-headline-4">{{ itemType === 'lost' ? 'Lost' : 'Found' }} Item Details</h1>
        <div>
          <button mat-icon-button color="warn" (click)="deleteItem()">
            <mat-icon>delete</mat-icon>
          </button>
          <button mat-icon-button color="primary" (click)="editItem()">
            <mat-icon>edit</mat-icon>
          </button>
        </div>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar>{{ itemType === 'lost' ? 'report_problem' : 'check_circle' }}</mat-icon>
          <mat-card-title>{{ item.item_name }}</mat-card-title>
          <mat-card-subtitle>Category: {{ item.category }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <h3>Description</h3>
          <p>{{ item.description }}</p>

          <mat-divider class="my-3"></mat-divider>

          <div class="detail-row">
            <mat-icon class="info-icon">location_on</mat-icon>
            <span>
              <strong>{{ itemType === 'lost' ? 'Last Seen' : 'Found' }} Location:</strong> 
              {{ getLocationText() }}
            </span>
          </div>

          <div class="detail-row">
            <mat-icon class="info-icon">calendar_today</mat-icon>
            <span>
              <strong>Date {{ itemType === 'lost' ? 'Lost' : 'Found' }}:</strong> 
              {{ getFormattedDate() }}
            </span>
          </div>

          <div class="detail-row">
            <mat-icon class="info-icon">access_time</mat-icon>
            <span>
              <strong>Reported:</strong> {{ item.created_at | date:'medium' }}
            </span>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="openContactDialog()">
            <mat-icon>contact_phone</mat-icon> CONTACT
          </button>
          <button mat-button (click)="goBack()">BACK</button>
        </mat-card-actions>
      </mat-card>
    </div>

    <div class="container text-center" *ngIf="loading">
      <mat-spinner diameter="50" class="m-auto mt-5"></mat-spinner>
      <p>Loading item details...</p>
    </div>

    <div class="container text-center" *ngIf="!loading && !item">
      <mat-icon class="large-icon mt-5">error</mat-icon>
      <h2>Item Not Found</h2>
      <p>The item you're looking for doesn't exist or has been removed.</p>
      <button mat-raised-button color="primary" (click)="goBack()">Go Back</button>
    </div>
  `,
  styles: [`
    .detail-row {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .info-icon {
      margin-right: 8px;
    }
    
    .my-3 {
      margin-top: 16px;
      margin-bottom: 16px;
    }
    
    .large-icon {
      font-size: 64px;
      height: 64px;
      width: 64px;
      color: #f44336;
    }
  `]
})
export class ItemDetailsComponent implements OnInit {
  item: LostItem | FoundItem | null = null;
  itemType: 'lost' | 'found' = 'lost';
  loading = true;
  itemId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lostItemService: LostItemService,
    private foundItemService: FoundItemService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      this.itemType = segments[0].path === 'lost-items' ? 'lost' : 'found';
      this.itemId = +this.route.snapshot.paramMap.get('id')!;
      this.loadItemDetails();
    });
  }

  loadItemDetails(): void {
    this.loading = true;
    
    if (this.itemType === 'lost') {
      this.lostItemService.getLostItem(this.itemId).subscribe({
        next: (item) => {
          this.item = item;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading lost item details', error);
          this.item = null;
          this.loading = false;
        }
      });
    } else {
      this.foundItemService.getFoundItem(this.itemId).subscribe({
        next: (item) => {
          this.item = item;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading found item details', error);
          this.item = null;
          this.loading = false;
        }
      });
    }
  }

  getLocationText(): string {
    if (!this.item) return '';
    
    if (this.itemType === 'lost') {
      return (this.item as LostItem).last_seen_location || 'Not specified';
    } else {
      return (this.item as FoundItem).found_location;
    }
  }

  getFormattedDate(): string {
    if (!this.item) return '';
    
    const date = this.itemType === 'lost' 
      ? (this.item as LostItem).date_lost 
      : (this.item as FoundItem).date_found;
    
    return date ? new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) : 'Not specified';
  }

  openContactDialog(): void {
    if (this.item) {
      this.dialog.open(ContactDialogComponent, {
        width: '400px',
        data: { contactInfo: this.item.contact_info }
      });
    }
  }

  editItem(): void {
    this.router.navigate([`/${this.itemType}-items`, this.itemId, 'edit']);
  }

  deleteItem(): void {
    if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      if (this.itemType === 'lost') {
        this.lostItemService.deleteLostItem(this.itemId).subscribe({
          next: () => {
            this.snackBar.open('Lost item deleted successfully', 'Close', { duration: 3000 });
            this.goBack();
          },
          error: (error) => {
            console.error('Error deleting lost item', error);
            this.snackBar.open('Error deleting item', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.foundItemService.deleteFoundItem(this.itemId).subscribe({
          next: () => {
            this.snackBar.open('Found item deleted successfully', 'Close', { duration: 3000 });
            this.goBack();
          },
          error: (error) => {
            console.error('Error deleting found item', error);
            this.snackBar.open('Error deleting item', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate([`/${this.itemType}-items`]);
  }
}