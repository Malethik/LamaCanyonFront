import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ItemService } from '../../core/service/item/item.service';
import { Item } from '../../core/model/item';

@Component({
  selector: 'app-dialog-animations',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: 'delete-dialog.component.html',
  styleUrl: 'delete-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent {
  item: Item[] = [];
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item }
  ) {}
  /*  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  readonly itemService = inject(ItemService);
  readonly dialogData = inject(MAT_DIALOG_DATA); */

  deleteItem(item: Item) {
    this.itemService
      .delete('item', this.data.item.id)
      .subscribe((data) => {
        console.log(data);
      });
    console.log(item);
  }
}
