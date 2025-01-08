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
import { Costumers } from '../../../../core/model/costumers';
import { CostumersService } from '../../service/costumers.service';

@Component({
  selector: 'app-del-dialog-costumer',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: 'del-costumer-dialog.component.html',
  styleUrl: 'del-costumer-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent {
  costumer: Costumers[] = [];
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private costumerService: CostumersService,
    @Inject(MAT_DIALOG_DATA) public data: { costumer: Costumers }
  ) {}

  deleteItem() {
    this.costumerService.delete(this.data.costumer.id).subscribe((data) => {
      console.log('Costumer deleted', data);
    });
  }
}
