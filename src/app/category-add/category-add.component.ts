import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  newCategory: Category = { id: 0, name: '' };
  constructor(
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
  }
  saveChanges(): void {
    debugger
    if (this.newCategory) {
      this.categoryService.addCategory(this.newCategory).subscribe(
        () => {

          // Close the dialog and signal that the category was updated
          this.activeModal.close('updated');
        },
        (error) => {
          console.error('Error updating category:', error);
          // Handle error scenarios, e.g., display an error message to the user
        }
      );
    }
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }
}
