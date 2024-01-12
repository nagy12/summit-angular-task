import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  @Input() category: Category | undefined;
  editedCategory: Category = { id: 0, name: '' };

  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService) {
    if (this.category) {
      debugger
      this.editedCategory = { ...this.category };
    }
  }
  ngOnInit(): void {
    // Create a copy of the original movie to avoid modifying it directly

  }


  saveChanges(): void {
    debugger
    if (this.editedCategory) {
      this.categoryService.updateCategory(this.editedCategory.id, this.editedCategory).subscribe(
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
}
