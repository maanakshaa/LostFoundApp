import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LostItem } from '../models/item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LostItemService {
  private apiUrl = `${environment.apiUrl}/lost-items`;

  constructor(private http: HttpClient) { }

  getLostItems(): Observable<LostItem[]> {
    return this.http.get<LostItem[]>(this.apiUrl);
  }

  getLostItem(id: number): Observable<LostItem> {
    return this.http.get<LostItem>(`${this.apiUrl}/${id}`);
  }

  createLostItem(item: LostItem): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  updateLostItem(id: number, item: LostItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteLostItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 