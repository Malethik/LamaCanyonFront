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
import { Costumers } from '../../../../core/model/costumers';
import { Observable } from 'rxjs';
import { OrderService } from '../../service/order.service';
import { Order } from '../../../../core/model/order';
@Component({
  selector: 'app-create-order-dialog',
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
  templateUrl: './create-order-dialog.component.html',
  styleUrl: './create-order-dialog.component.css',
})
export class CreateOrderDialogComponent {
  createForm!: FormGroup;
  costumersService = inject(OrderService);
  disable!: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm = this.fb.group({
      total: [data.total, Validators.required],
      item: [data.item, Validators.required],
      costumers: [data.costumers, [Validators.required, Validators.email]],
      // Aggiungi altri campi secondo necessità
    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    if (this.createForm.valid) {
      this.createCostumer(this.createForm.value).subscribe((data) => {
        console.log('Order created', data);
      });
      this.dialogRef.close();
    }
  }

  createCostumer(order: Order): Observable<Order> {
    console.log('Edit costumer', order);
    const endpoint = 'order';
    return this.costumersService.create(order);
  }
}
