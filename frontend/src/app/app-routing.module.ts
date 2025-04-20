import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LostItemsComponent } from './components/lost-items/lost-items.component';
import { FoundItemsComponent } from './components/found-items/found-items.component';
import { LostItemFormComponent } from './components/lost-item-form/lost-item-form.component';
import { FoundItemFormComponent } from './components/found-item-form/found-item-form.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lost-items', component: LostItemsComponent },
  { path: 'found-items', component: FoundItemsComponent },
  { path: 'lost-items/new', component: LostItemFormComponent },
  { path: 'found-items/new', component: FoundItemFormComponent },
  { path: 'lost-items/:id', component: ItemDetailsComponent },
  { path: 'found-items/:id', component: ItemDetailsComponent },
  { path: 'lost-items/:id/edit', component: LostItemFormComponent },
  { path: 'found-items/:id/edit', component: FoundItemFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 