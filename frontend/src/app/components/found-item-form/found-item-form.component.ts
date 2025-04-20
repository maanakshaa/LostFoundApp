import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FoundItem, ITEM_CATEGORIES } from '../../models/item.model';
import { FoundItemService } from '../../services/found-item.service';

@Component({
  selector: 'app-found-item-form',
  template: `
    <div class="container">
      <div class="page-header">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1 class="mat-headline-4">{{ isEditMode ? 'Edit Found Item' : 'Report Found Item' }}</h1>
      </div>

      <mat-card>
        <mat-card-content>
          <form [formGroup]="itemForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Item Name</mat-label>
                <input matInput formControlName="item_name" placeholder="Enter item name">
                <mat-error *ngIf="itemForm.get('item_name')?.hasError('required')">
                  Item name is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Category</mat-label>
                <mat-select formControlName="category">
                  <mat-option *ngFor="let category of categories" [value]="category">
                    {{ category }}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="itemForm.get('category')?.hasError('required')">
                  Category is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="4" 
                  placeholder="Describe the item in detail"></textarea>
                <mat-error *ngIf="itemForm.get('description')?.hasError('required')">
                  Description is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Found Location</mat-label>
                <input matInput formControlName="found_location" 
                  placeholder="Where did you find the item?">
                <mat-error *ngIf="itemForm.get('found_location')?.hasError('required')">
                  Found location is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Date Found</mat-label>
                <input matInput [matDatepicker]="dateFoundPicker" formControlName="date_found">
                <mat-datepicker-toggle matSuffix [for]="dateFoundPicker"></mat-datepicker-toggle>
                <mat-datepicker #dateFoundPicker></mat-datepicker>
                <mat-error *ngIf="itemForm.get('date_found')?.hasError('required')">
                  Date found is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Contact Information</mat-label>
                <input matInput formControlName="contact_info" 
                  placeholder="Your email or phone number">
                <mat-error *ngIf="itemForm.get('contact_info')?.hasError('required')">
                  Contact information is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-actions">
              <button mat-button type="button" (click)="goBack()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" 
                [disabled]="itemForm.invalid || loading">
                {{ isEditMode ? 'Update' : 'Submit' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-row {
      margin-bottom: 16px;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
  `]
})
export class FoundItemFormComponent implements OnInit {
  itemForm!: FormGroup;
  isEditMode = false;
  itemId!: number;
  loading = false;
  categories = ITEM_CATEGORIES;

  constructor(
    private fb: FormBuilder,
    private foundItemService: FoundItemService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.itemId = +id;
      this.loadItem();
    }
  }

  initForm(): void {
    this.itemForm = this.fb.group({
      item_name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      found_location: ['', Validators.required],
      date_found: ['', Validators.required],
      contact_info: ['', Validators.required]
    });
  }

  loadItem(): void {
    this.loading = true;
    this.foundItemService.getFoundItem(this.itemId).subscribe({
      next: (item) => {
        this.itemForm.patchValue({
          ...item,
          date_found: new Date(item.date_found)
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading found item for edit', error);
        this.snackBar.open('Error loading item', 'Close', { duration: 3000 });
        this.goBack();
      }
    });
  }

  onSubmit(): void {
    if (this.itemForm.invalid) return;
    
    this.loading = true;
    const formData = this.itemForm.value;
    
    if (this.isEditMode) {
      this.foundItemService.updateFoundItem(this.itemId, formData).subscribe({
        next: () => {
          this.snackBar.open('Found item updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/found-items', this.itemId]);
        },
        error: (error) => {
          console.error('Error updating found item', error);
          let errorMsg = 'Error updating item';
          if (error.error && error.error.message) {
            errorMsg = error.error.message;
          }
          this.snackBar.open(errorMsg, 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    } else {
      this.foundItemService.createFoundItem(formData).subscribe({
        next: (response) => {
          this.snackBar.open('Found item reported successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/found-items']);
        },
        error: (error) => {
          console.error('Error reporting found item', error);
          let errorMsg = 'Error reporting item';
          if (error.error && error.error.message) {
            errorMsg = error.error.message;
          } else if (error.status === 0) {
            errorMsg = 'Could not connect to the server. Please make sure the backend is running.';
          }
          this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    if (this.isEditMode) {
      this.router.navigate(['/found-items', this.itemId]);
    } else {
      this.router.navigate(['/found-items']);
    }
  }
} 