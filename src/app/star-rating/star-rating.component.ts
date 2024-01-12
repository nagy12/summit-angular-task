import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0; // Input property for the movie rating
  @Input() maxRating: number = 5; // Maximum rating (default is 5)
  constructor() { }

  ngOnInit(): void {
  }

}
