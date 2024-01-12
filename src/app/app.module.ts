import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieUpdateComponent } from './movie-update/movie-update.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { WeatherComponent } from './weather/weather.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieDeleteComponent } from './movie-delete/movie-delete.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryAddComponent } from './category-add/category-add.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    CategoryListComponent,
    MovieDetailsComponent,
    MovieUpdateComponent,
    NavigationComponent,
    WeatherComponent,
    MovieDeleteComponent,
    StarRatingComponent,
    EditCategoryComponent,
    CategoryAddComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
    // ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
