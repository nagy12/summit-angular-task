import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie-service.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  categories: any[] = [];
  selectedCategory: any = '';
  relatedCategories: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    debugger
    this.route.params.subscribe((params) => {
      const movieId = params['id'];
      this.loadMovieDetails(movieId);
      this.loadCategories();

    });
  }
  loadMovieDetails(movieId: number): void {
    debugger
    this.movieService.getMovie(movieId).subscribe((data) => {
      debugger
      this.movie = data;
      this.loadRelatedCategories(this.movie);
    });
  }
  loadMovie(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (movieId) {
      this.movieService.getMovie(movieId).subscribe((data) => {
        this.movie = data;
      });
    }
  }
  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  // onCategorySelect(event: any): void {
  //   debugger
  //   this.selectedCategory = event.target.value;
  // }
  assignCategory(): void {
    debugger

    if (this.selectedCategory) {
      this.movieService
        .assignCategoryToMovie(this.movie.id, this.selectedCategory)
        .subscribe(() => {
          // Reload the movie details
          this.loadMovie();
        });
    }
  }
  onSelectChange(event: any): void {
    debugger
    this.selectedCategory = event.target.value;
    // You can perform additional logic here based on the selected value
  }
  loadRelatedCategories(movie: any): void {
    debugger
    if (movie) {
      this.movieService.getRelatedCategories(this.movie.id).subscribe((data) => {
        this.relatedCategories = data;
      });
    }
  }
  // onChange(newValue: any) {
  //   debugger
  //   console.log(newValue);
  //   this.selectedCategory = newValue;
  //   // ... do other stuff here ...
  // }
  // openEditDialog(): void {
  //   // Implement logic to open an edit dialog
  // }

  // deleteMovie(): void {
  //   // Implement logic to delete the movie
  // }

}
