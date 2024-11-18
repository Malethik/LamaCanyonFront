import { Component, inject, OnInit } from '@angular/core';
import { ItemService } from '../../core/service/item/item.service';
import { Item } from '../../core/model/item';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {
  items: Item[] = [];
  constructor(private itemService: ItemService) {}
  readonly dialog = inject(MatDialog);
  ngOnInit() {
    this.itemService.getAll().subscribe((data) => {
      console.log(data);
      this.items = data;
    });
  }
  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  // edit item da implementare nel successivo dialog
  /*  editItem(item: Item) {
    this.itemService.update('item', item.id, item).subscribe((data) => {
      console.log(data);
    });
    console.log(item);
  } */

  openDialog(
    item: Item,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { item: item },
    });
  }
}
