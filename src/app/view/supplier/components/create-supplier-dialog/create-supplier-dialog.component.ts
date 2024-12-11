import { Component, inject, Inject } from '@angular/core';
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
  selector: 'app-create-supplier-dialog',
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
  templateUrl: './create-supplier-dialog.component.html',
  styleUrl: './create-supplier-dialog.component.css',
})
export class CreateSupplierDialogComponent {
  createForm!: FormGroup;
  supplierService = inject(SupplierService);
  disable!: boolean;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateSupplierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm = this.fb.group({
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
    if (this.createForm.valid) {
      this.createCostumer(this.createForm.value).subscribe((data) => {
        console.log('Costumer edited', data);
      });
      this.dialogRef.close();
    }
  }

  createCostumer(supplier: Supplier): Observable<Supplier> {
    console.log('Edit costumer', supplier);
    const endpoint = 'supplier';
    return this.supplierService.create(endpoint, supplier);
  }
}
