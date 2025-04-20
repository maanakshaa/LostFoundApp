import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoundItem } from '../models/item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoundItemService {
  private apiUrl = `${environment.apiUrl}/found-items`;

  constructor(private http: HttpClient) { }

  getFoundItems(): Observable<FoundItem[]> {
    return this.http.get<FoundItem[]>(this.apiUrl);
  }

  getFoundItem(id: number): Observable<FoundItem> {
    return this.http.get<FoundItem>(`${this.apiUrl}/${id}`);
  }

  createFoundItem(item: FoundItem): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  updateFoundItem(id: number, item: FoundItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  deleteFoundItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 