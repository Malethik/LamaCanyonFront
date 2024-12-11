import { Component, inject, OnInit } from '@angular/core';
import { Costumers } from '../../../../core/model/costumers';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CostumersService } from '../../service/costumers.service';
import { DeleteDialogComponent } from '../delete-costumers-dialog/del-costumer-dialog';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { Observable } from 'rxjs';
import { EditCostumerDialogComponent } from '../edit-costumer-dialog/edit-costumer-dialog.component';
import { CreateCustomersDialogComponent } from '../create-customers-dialog/create-customers-dialog.component';

@Component({
  selector: 'app-costumers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    FooterComponent,
  ],
  templateUrl: './costumers.component.html',
  styleUrl: './costumers.component.css',
})
export class CostumersComponent implements OnInit {
  costumers: Costumers[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'address',
    'createdAt',
    'actions',
  ];
  dataSource = new MatTableDataSource<Costumers>();
  readonly dialog = inject(MatDialog);
  constructor(private costumersService: CostumersService) {}

  ngOnInit() {
    this.costumersService.getAll().subscribe((data) => {
      console.log(data);
      this.costumers = data;
      this.dataSource.data = data;
    });
  }
  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
 

  

  openCreateDialog(): void {
    this.dialog.open(CreateCustomersDialogComponent, {
      width: '250px',
      data: {},
    });
  }

  openEditDialog(costumer: Costumers): void {
    this.dialog.open(EditCostumerDialogComponent, {
      width: '250px',
      data: costumer,
    });
  }

  openDialog(costumer: Costumers): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { costumer: costumer },
    });
  }
  
}
