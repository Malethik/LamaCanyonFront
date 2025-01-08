import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SupplierService } from '../../service/supplier.service';
import { Supplier } from '../../../../core/model/supplier';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-supplier-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-supplier-dialog.component.html',
  styleUrl: './edit-supplier-dialog.component.css',
})
export class EditSupplierDialogComponent {
  editForm!: FormGroup;
  costumersService = inject(SupplierService);
  disable!: boolean;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditSupplierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      id: [data.id],
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, Validators.required],
      address: [data.address, Validators.required],
      // Aggiungi altri campi secondo necessità
    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.editCostumer(this.editForm.value).subscribe((data) => {
        console.log('Costumer edited', data);
      });
      this.dialogRef.close();
    }
  }
  editCostumer(supplier: Supplier): Observable<Supplier> {
    console.log('Edit costumer', supplier);
    return this.costumersService.update(supplier.id, supplier);
  }
}
