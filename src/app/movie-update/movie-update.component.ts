import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from '../services/movie-service.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {
  @Input() movie: Movie | undefined;
  editedMovie: any;
  movieId: any;
  constructor(public activeModal: NgbActiveModal, private movieService: MovieService) { }

  ngOnInit(): void {
    // Create a copy of the original movie to avoid modifying it directly
    this.editedMovie = { ...this.movie };
    this.movieId = this.editedMovie?.id;
  }

  saveChanges(): void {
    debugger
    // Implement save changes logic
    if (this.editedMovie) {
      this.movieService.updateMovie(this.movieId, this.editedMovie).subscribe(() => {
        this.activeModal.close(this.editedMovie);
      });
    }
  }
}
