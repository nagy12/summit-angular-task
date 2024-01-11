import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any;

  constructor(
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    debugger
    this.movieService.getMovies().subscribe(
      (data) => {
        debugger
        this.movies = data;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }
  navigateToDetail(id: number): void {
    this.router.navigate(['/details', id]);
  }
}
