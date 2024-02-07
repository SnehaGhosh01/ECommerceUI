import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { Category } from '../models/models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  showAddForm: boolean = false;
  editedCategory: Category | null = null;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.navigationService.getAllCategories()
      .subscribe(
        response => {
          this.categories = response.map((item: any) => ({
            id: item.id,
            category: item.name,
            subCategory: item.subCategory
          }));
        },
        error => {
          console.error('Error getting categories:', error);
        }
      );
  }

  addCategory(category: any): void {
    const categoryToAdd = {
      name: category.category,
      subCategory: category.subCategory
    };
    this.navigationService.addCategory(categoryToAdd)
      .subscribe(
        response => {
          console.log('Category added successfully:', response);
          this.getAllCategories();
          this.showAddForm = false;
        },
        error => {
          console.error('Error adding category:', error);
        }
      );
  }
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm; // Toggle the visibility of the form
  }

  editCategory(category: Category): void {
    this.editedCategory = { ...category }; // Make a copy of the category being edited
    this.showAddForm = true; // Show the form
  }

  saveEditedCategory(): void {
    if (this.editedCategory) {
      const categoryToUpdate = {
        name: this.editedCategory.category,
        subCategory: this.editedCategory.subCategory
      };

      this.navigationService.updateCategory(this.editedCategory.id, categoryToUpdate)
        .subscribe(
          response => {
            console.log('Category updated successfully:', response);
            this.getAllCategories();
            this.editedCategory = null;
            this.showAddForm = false; // Hide the form after saving
          },
          error => {
            console.error('Error updating category:', error);
          }
        );
    }
  }

  deleteCategory(id: number): void {
    this.navigationService.deleteCategory(id)
      .subscribe(
        response => {
          console.log('Category deleted successfully:', response);
          this.getAllCategories();
        },
        error => {
          console.error('Error deleting category:', error);
        }
      );
  }

  cancelEdit(): void {
    this.editedCategory = null;
    this.showAddForm = false; // Hide the form when editing is canceled
  }
}
