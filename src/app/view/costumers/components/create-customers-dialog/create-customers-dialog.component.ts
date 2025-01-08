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
import { CostumersService } from '../../service/costumers.service';
import { Costumers } from '../../../../core/model/costumers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-customers-dialog',
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
  templateUrl: './create-customers-dialog.component.html',
  styleUrl: './create-customers-dialog.component.css',
})
export class CreateCustomersDialogComponent {
  createForm!: FormGroup;
  costumersService = inject(CostumersService);
  disable!: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateCustomersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm = this.fb.group({
      name: [data.name, Validators.required],
      password: [data.password, Validators.required],
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

  createCostumer(costumer: Costumers): Observable<Costumers> {
    console.log('Edit costumer', costumer);
    const endpoint = 'costumers';
    return this.costumersService.create(costumer);
  }
}
