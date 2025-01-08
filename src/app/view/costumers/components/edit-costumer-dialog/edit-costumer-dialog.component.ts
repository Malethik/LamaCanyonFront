import { Component, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
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
import { CostumersService } from '../../service/costumers.service';

@Component({
  selector: 'app-edit-costumer-dialog',
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
  templateUrl: './edit-costumer-dialog.component.html',
  styleUrl: './edit-costumer-dialog.component.css',
})
export class EditCostumerDialogComponent {
  editForm!: FormGroup;
  costumersService = inject(CostumersService);
  disable!: boolean;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCostumerDialogComponent>,
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
  editCostumer(costumer: Costumers): Observable<Costumers> {
    console.log('Edit costumer', costumer);
    return this.costumersService.update(costumer.id, costumer);
  }
}
