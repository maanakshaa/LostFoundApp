import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FoundItem, ITEM_CATEGORIES } from '../../models/item.model';
import { FoundItemService } from '../../services/found-item.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-found-items',
  template: `
    <div class="container">
      <div class="page-header">
        <h1 class="mat-headline-4">Found Items</h1>
        <button mat-raised-button color="primary" [routerLink]="['/found-items/new']">
          <mat-icon>add</mat-icon> Report Found Item
        </button>
      </div>

      <div class="search-bar">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Search</mat-label>
          <input matInput [formControl]="searchControl" placeholder="Search by name or description">
          <mat-icon matPrefix>search</mat-icon>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Category</mat-label>
          <mat-select [formControl]="categoryControl">
            <mat-option value="">All Categories</mat-option>
            <mat-option *ngFor="let category of categories" [value]="category">
              {{ category }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div *ngIf="loading" class="text-center mt-4">
        <mat-spinner diameter="50" class="m-auto"></mat-spinner>
        <p>Loading found items...</p>
      </div>

      <div *ngIf="!loading && filteredItems.length === 0" class="text-center mt-4">
        <mat-icon class="large-icon">search_off</mat-icon>
        <h2>No found items available</h2>
        <p>There are no found items that match your search criteria.</p>
      </div>

      <div *ngIf="!loading && filteredItems.length > 0" class="card-container">
        <mat-card *ngFor="let item of filteredItems" class="item-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>check_circle</mat-icon>
            <mat-card-title>{{ item.item_name }}</mat-card-title>
            <mat-card-subtitle>{{ item.category }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <p>{{ item.description | slice:0:100 }}{{ item.description.length > 100 ? '...' : '' }}</p>
            
            <mat-divider></mat-divider>
            
            <p>
              <mat-icon class="info-icon">location_on</mat-icon> 
              Found at: {{ item.found_location }}
            </p>
            
            <p>
              <mat-icon class="info-icon">calendar_today</mat-icon>
              Date found: {{ item.date_found | date:'mediumDate' }}
            </p>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-button color="primary" (click)="openContactDialog(item)">
              <mat-icon>contact_phone</mat-icon> CONTACT
            </button>
            <button mat-button color="accent" (click)="viewDetails(item.id!)">
              <mat-icon>info</mat-icon> DETAILS
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .large-icon {
      font-size: 64px;
      height: 64px;
      width: 64px;
      color: #ccc;
    }
    
    .info-icon {
      vertical-align: middle;
      font-size: 16px;
      margin-right: 4px;
      color: rgba(0,0,0,0.6);
    }
  `]
})
export class FoundItemsComponent implements OnInit {
  items: FoundItem[] = [];
  filteredItems: FoundItem[] = [];
  loading = true;
  searchControl = new FormControl('');
  categoryControl = new FormControl('');
  categories = ITEM_CATEGORIES;

  constructor(
    private foundItemService: FoundItemService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadItems();
    
    this.searchControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });
    
    this.categoryControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadItems(): void {
    this.loading = true;
    this.foundItemService.getFoundItems().subscribe({
      next: (items) => {
        this.items = items;
        this.filteredItems = items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading found items', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = this.items;
    
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.item_name.toLowerCase().includes(searchTerm) || 
        item.description.toLowerCase().includes(searchTerm)
      );
    }
    
    const category = this.categoryControl.value;
    if (category) {
      filtered = filtered.filter(item => item.category === category);
    }
    
    this.filteredItems = filtered;
  }

  openContactDialog(item: FoundItem): void {
    this.dialog.open(ContactDialogComponent, {
      width: '400px',
      data: { contactInfo: item.contact_info }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/found-items', id]);
  }
} 