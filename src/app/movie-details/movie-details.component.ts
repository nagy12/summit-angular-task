import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../services/movie-service.service';
import { CategoryService } from '../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieUpdateComponent } from '../movie-update/movie-update.component';
import { Movie } from '../models/movie';

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
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private router: Router
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
  // loadMovie(): void {
  //   const movieId = Number(this.route.snapshot.paramMap.get('id'));
  //   if (movieId) {
  //     this.movieService.getMovie(movieId).subscribe((data) => {
  //       this.movie = data;
  //     });
  //   }
  // }
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
          this.loadMovieDetails(this.movie.id);

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
        debugger
        this.relatedCategories = data;
      });
    }
  }

  openEditDialog(): void {
    const modalRef = this.modalService.open(MovieUpdateComponent);
    modalRef.componentInstance.movie = this.movie;

    modalRef.result.then((updatedMovie: Movie) => {
      // Update the movie details in the component
      this.movie = updatedMovie;
    });
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
  // openDeleteDialog(): void {
  //   // const modalRef = this.modalService.open(DeleteMovieComponent);
  //   // modalRef.componentInstance.movie = this.movie;

  //   // modalRef.componentInstance.movieDeleted.subscribe(() => {
  //   //   // Handle the movie deletion here
  //   //   this.deleteMovie();
  //   // });
  // }

  deleteMovie(): void {
    // Implement movie deletion logic here
    // For example, you might want to call a service to delete the movie from the backend
    this.movieService.deleteMovie(this.movie.id).subscribe(
      () => {
        console.log(`Movie with ID ${this.movie.id} deleted successfully.`);
        // Additional actions after successful deletion, e.g., navigate to another page
      },
      (error) => {
        console.error('Error deleting movie:', error);
        // Handle error scenarios, e.g., display an error message to the user
      }
    );
  }
  openDeleteDialog(): void {
    // Implement a delete confirmation dialog (optional)
    const confirmDelete = window.confirm(`Are you sure you want to delete the movie "${this.movie?.title}"?`);
    if (confirmDelete) {
      // Call the API to delete the movie
      // Assuming you have a movie service with a deleteMovie method
      this.movieService.deleteMovie(this.movie!.id).subscribe(
        () => {
          console.log(`Movie with ID ${this.movie!.id} deleted successfully.`);
          this.router.navigate(['/movies']);
          // Additional actions after successful deletion, e.g., navigate to another page
        },
        (error) => {
          console.error('Error deleting movie:', error);
          // Handle error scenarios, e.g., display an error message to the user
        }
      );
    }
  }
}
