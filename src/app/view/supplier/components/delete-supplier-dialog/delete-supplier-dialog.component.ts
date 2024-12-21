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
import { Supplier } from '../../../../core/model/supplier';
import { SupplierService } from '../../service/supplier.service';
@Component({
  selector: 'app-delete-supplier-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './delete-supplier-dialog.component.html',
  styleUrl: './delete-supplier-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteSupplierDialogComponent {
  supplier: Supplier[] = [];
  constructor(
    public dialogRef: MatDialogRef<DeleteSupplierDialogComponent>,
    private supplierService: SupplierService,
    @Inject(MAT_DIALOG_DATA) public data: { supplier: Supplier }
  ) {
    console.log('Supplier Data:', this.data.supplier); // Aggiungi questo log
  }

  deleteItem() {
    this.supplierService
      .delete('supplier', this.data.supplier.id)
      .subscribe((data) => {
        console.log('Supplier deleted', data);
      });
  }
}
