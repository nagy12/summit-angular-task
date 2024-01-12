import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.movieApiUrl}/Category`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetCategories`);
  }

  getCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addCategory(category: any): Observable<any> {
    debugger
    return this.http.post<any>(`${this.apiUrl}/AddCategory`, category);
  }

  updateCategory(id: number, updatedCategory: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, updatedCategory);
  }

  deleteCategory(id: number): Observable<void> {
    debugger
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
