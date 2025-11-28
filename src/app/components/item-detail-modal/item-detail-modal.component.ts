import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CategoryService } from '../../services/category.service';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { Category, SubCategory, SubSubCategory } from '../../models/category.model';

@Component({
  selector: 'app-item-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    ButtonModule,
    DividerModule,
    ImageModule,
    GalleriaModule
  ],
  templateUrl: './item-detail-modal.component.html',
  styleUrls: ['./item-detail-modal.component.scss']
})
export class ItemDetailModalComponent implements OnChanges {
  @Input() visible = false;
  @Input() item: Item | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Item>();

  editedItem: any = {};
  fullItemDetails: Item | null = null;
  loading = false;

  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  subSubCategories: SubSubCategory[] = [];

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && this.item) {
      this.editedItem = { ...this.item };
      this.loadFullItemDetails();
      this.loadCategories();
      
      if (this.item.rozana_category_id) {
        this.loadSubCategories(this.item.rozana_category_id);
      }
      
      if (this.item.rozana_sub_category_id) {
        this.loadSubSubCategories(
          this.item.rozana_category_id!,
          this.item.rozana_sub_category_id
        );
      }
    }
  }

  loadFullItemDetails() {
    if (!this.item?.id) return;
    
    this.loading = true;
    this.itemService.getItemById(this.item.id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.fullItemDetails = response.data;
          this.editedItem = { ...this.editedItem, ...response.data };
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: () => {}
    });
  }

  loadSubCategories(categoryId: number) {
    this.categoryService.getSubCategories(categoryId).subscribe({
      next: (response) => {
        this.subCategories = response.data;
      },
      error: () => {}
    });
  }

  loadSubSubCategories(categoryId: number, subcategoryId: number) {
    this.categoryService.getSubSubCategories(categoryId, subcategoryId).subscribe({
      next: (response) => {
        this.subSubCategories = response.data;
      },
      error: () => {}
    });
  }

  onCategoryChange() {
    this.editedItem.rozana_sub_category_id = null;
    this.editedItem.rozana_sub_sub_category_id = null;
    this.subCategories = [];
    this.subSubCategories = [];

    if (this.editedItem.rozana_category_id) {
      this.loadSubCategories(this.editedItem.rozana_category_id);
    }
  }

  onSubCategoryChange() {
    this.editedItem.rozana_sub_sub_category_id = null;
    this.subSubCategories = [];

    if (this.editedItem.rozana_sub_category_id) {
      this.loadSubSubCategories(
        this.editedItem.rozana_category_id,
        this.editedItem.rozana_sub_category_id
      );
    }
  }

  onClose() {
    this.close.emit();
  }

  onSave() {
    this.save.emit(this.editedItem);
  }
}
