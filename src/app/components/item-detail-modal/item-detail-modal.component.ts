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
    console.log('ItemDetailModalComponent - ngOnChanges', { changes, item: this.item });
    if (changes['item'] && this.item) {
      console.log('ItemDetailModalComponent - Item changed, initializing', this.item);
      this.editedItem = { ...this.item };
      console.log('ItemDetailModalComponent - editedItem initialized', this.editedItem);
      this.loadFullItemDetails();
      this.loadCategories();
      
      if (this.item.rozana_category_id) {
        console.log('ItemDetailModalComponent - Loading subcategories for category', this.item.rozana_category_id);
        this.loadSubCategories(this.item.rozana_category_id);
      }
      
      if (this.item.rozana_sub_category_id) {
        console.log('ItemDetailModalComponent - Loading sub-subcategories', {
          categoryId: this.item.rozana_category_id,
          subCategoryId: this.item.rozana_sub_category_id
        });
        this.loadSubSubCategories(
          this.item.rozana_category_id!,
          this.item.rozana_sub_category_id
        );
      }
    }
  }

  loadFullItemDetails() {
    console.log('ItemDetailModalComponent - loadFullItemDetails called', { itemId: this.item?.id });
    if (!this.item?.id) {
      console.log('ItemDetailModalComponent - No item ID, skipping loadFullItemDetails');
      return;
    }
    
    this.loading = true;
    console.log('ItemDetailModalComponent - Loading full item details for ID:', this.item.id);
    this.itemService.getItemById(this.item.id).subscribe({
      next: (response) => {
        console.log('ItemDetailModalComponent - getItemById response', response);
        if (response.success && response.data) {
          console.log('ItemDetailModalComponent - Full item details loaded', response.data);
          this.fullItemDetails = response.data;
          this.editedItem = { ...this.editedItem, ...response.data };
          console.log('ItemDetailModalComponent - editedItem updated', this.editedItem);
        } else {
          console.log('ItemDetailModalComponent - Response not successful or no data', response);
        }
        this.loading = false;
        console.log('ItemDetailModalComponent - Loading complete');
      },
      error: (error) => {
        console.error('ItemDetailModalComponent - Error loading full item details', error);
        this.loading = false;
      }
    });
  }

  loadCategories() {
    console.log('ItemDetailModalComponent - loadCategories called');
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        console.log('ItemDetailModalComponent - Categories loaded', response);
        this.categories = response.data;
        console.log('ItemDetailModalComponent - Categories set', this.categories);
      },
      error: (error) => {
        console.error('ItemDetailModalComponent - Error loading categories', error);
      }
    });
  }

  loadSubCategories(categoryId: number) {
    console.log('ItemDetailModalComponent - loadSubCategories called', { categoryId });
    this.categoryService.getSubCategories(categoryId).subscribe({
      next: (response) => {
        console.log('ItemDetailModalComponent - SubCategories loaded', response);
        this.subCategories = response.data;
        console.log('ItemDetailModalComponent - SubCategories set', this.subCategories);
      },
      error: (error) => {
        console.error('ItemDetailModalComponent - Error loading subcategories', { categoryId, error });
      }
    });
  }

  loadSubSubCategories(categoryId: number, subcategoryId: number) {
    console.log('ItemDetailModalComponent - loadSubSubCategories called', { categoryId, subcategoryId });
    this.categoryService.getSubSubCategories(categoryId, subcategoryId).subscribe({
      next: (response) => {
        console.log('ItemDetailModalComponent - SubSubCategories loaded', response);
        this.subSubCategories = response.data;
        console.log('ItemDetailModalComponent - SubSubCategories set', this.subSubCategories);
      },
      error: (error) => {
        console.error('ItemDetailModalComponent - Error loading sub-subcategories', { categoryId, subcategoryId, error });
      }
    });
  }

  onCategoryChange() {
    console.log('ItemDetailModalComponent - onCategoryChange called', {
      selectedCategoryId: this.editedItem.rozana_category_id,
      editedItem: this.editedItem
    });
    this.editedItem.rozana_sub_category_id = null;
    this.editedItem.rozana_sub_sub_category_id = null;
    this.subCategories = [];
    this.subSubCategories = [];
    console.log('ItemDetailModalComponent - Cleared subcategories and sub-subcategories');

    if (this.editedItem.rozana_category_id) {
      console.log('ItemDetailModalComponent - Loading subcategories for selected category', this.editedItem.rozana_category_id);
      this.loadSubCategories(this.editedItem.rozana_category_id);
    } else {
      console.log('ItemDetailModalComponent - No category selected');
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
