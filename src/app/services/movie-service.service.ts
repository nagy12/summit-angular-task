import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = `${environment.movieApiUrl}/Movie`;
  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    debugger
    return this.http.get<Movie[]>(`${this.apiUrl}/GetMovies`);
  }

  getMovie(id: number): Observable<Movie> {
    debugger
    return this.http.get<Movie>(`${this.apiUrl}/GetMovie/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  assignCategoryToMovie(movieId: string, categoryId: string): Observable<any> {
    debugger
    return this.http.post(`${this.apiUrl}/${movieId}/categories/${categoryId}`, {});
  }
  getRelatedCategories(movieId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${movieId}/related-categories`;
    return this.http.get<any[]>(url);
  }
}
