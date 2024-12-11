import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Item } from '../../../../core/model/item';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-item-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: 'del-item-dialog.component.html',
  styleUrl: 'del-item-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent {
  item: Item[] = [];
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }
  ) {}

  deleteItem(item: Item) {
    this.itemService.delete('item', this.data.item.id).subscribe((data) => {
      console.log(data);
    });
    console.log(item);
  }
}
