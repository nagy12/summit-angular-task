import { Category } from './../models/category';
import { Component, NgModule, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { CategoryAddComponent } from '../category-add/category-add.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  category: any;

  constructor(private categoryService: CategoryService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        debugger
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  openAddCategoryDialog(): void {
    const modalRef = this.modalService.open(CategoryAddComponent, { size: 'lg' });

    modalRef.result.then((result) => {
      if (result) {

        debugger
        this.loadCategories();

      }
    });
  }
  openEditCategoryDialog(category: Category): void {
    debugger
    const modalRef = this.modalService.open(EditCategoryComponent, { size: 'lg' });
    modalRef.componentInstance.editedCategory = { ...category };

    modalRef.result.then((updatedMovie: Category) => {
      // Update the movie details in the component
      this.loadCategories();
    });
  }

  deleteCategory(category: Category): void {
    const confirmDelete = window.confirm(`Are you sure you want to delete the category "${category.name}"?`);
    if (confirmDelete) {
      debugger
      this.categoryService.deleteCategory(category.id).subscribe(
        () => {
          console.log(`Category with ID ${category.id} deleted successfully.`);
          // Reload categories after deletion
          this.loadCategories();
        },
        (error) => {
          console.error('Error deleting category:', error);
          // Handle error scenarios, e.g., display an error message to the user
        }
      );
    }
  }
}


