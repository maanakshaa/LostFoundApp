import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LostItem, ITEM_CATEGORIES } from '../../models/item.model';
import { LostItemService } from '../../services/lost-item.service';

@Component({
  selector: 'app-lost-item-form',
  template: `
    <div class="container">
      <div class="page-header">
        <button mat-icon-button (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1 class="mat-headline-4">{{ isEditMode ? 'Edit Lost Item' : 'Report Lost Item' }}</h1>
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
                <mat-label>Last Seen Location</mat-label>
                <input matInput formControlName="last_seen_location" 
                  placeholder="Where did you last see the item?">
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Date Lost</mat-label>
                <input matInput [matDatepicker]="dateLostPicker" formControlName="date_lost">
                <mat-datepicker-toggle matSuffix [for]="dateLostPicker"></mat-datepicker-toggle>
                <mat-datepicker #dateLostPicker></mat-datepicker>
                <mat-error *ngIf="itemForm.get('date_lost')?.hasError('required')">
                  Date lost is required
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
export class LostItemFormComponent implements OnInit {
  itemForm!: FormGroup;
  isEditMode = false;
  itemId!: number;
  loading = false;
  categories = ITEM_CATEGORIES;

  constructor(
    private fb: FormBuilder,
    private lostItemService: LostItemService,
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
      last_seen_location: [''],
      date_lost: ['', Validators.required],
      contact_info: ['', Validators.required]
    });
  }

  loadItem(): void {
    this.loading = true;
    this.lostItemService.getLostItem(this.itemId).subscribe({
      next: (item) => {
        this.itemForm.patchValue({
          ...item,
          date_lost: new Date(item.date_lost)
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading lost item for edit', error);
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
      this.lostItemService.updateLostItem(this.itemId, formData).subscribe({
        next: () => {
          this.snackBar.open('Lost item updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/lost-items', this.itemId]);
        },
        error: (error) => {
          console.error('Error updating lost item', error);
          let errorMsg = 'Error updating item';
          if (error.error && error.error.message) {
            errorMsg = error.error.message;
          }
          this.snackBar.open(errorMsg, 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    } else {
      this.lostItemService.createLostItem(formData).subscribe({
        next: (response) => {
          this.snackBar.open('Lost item reported successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/lost-items']);
        },
        error: (error) => {
          console.error('Error reporting lost item', error);
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
      this.router.navigate(['/lost-items', this.itemId]);
    } else {
      this.router.navigate(['/lost-items']);
    }
  }
} 