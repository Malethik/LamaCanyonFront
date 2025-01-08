import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Costumers } from '../../../../core/model/costumers';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CostumersService } from '../../service/costumers.service';
import { DeleteDialogComponent } from '../delete-costumers-dialog/del-costumer-dialog';
import { FooterComponent } from '../../../../shared/footer/footer.component';

import { EditCostumerDialogComponent } from '../edit-costumer-dialog/edit-costumer-dialog.component';
import { CreateCustomersDialogComponent } from '../create-customers-dialog/create-customers-dialog.component';
import { GenericModalComponent } from '../../../../shared/modal/create-modal/create-modal.component';

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
  @ViewChild('filterInput') filterInput!: ElementRef;

  readonly dialog = inject(MatDialog);
  constructor(private costumersService: CostumersService) {}

  ngOnInit() {
    this.costumersService.getAll().subscribe((data) => {
      console.log(data);
      this.costumers = data;
      this.dataSource.data = data;
      this.dataSource.filterPredicate = (data, filter: string) => {
        return data.name.toLowerCase().includes(filter.toLowerCase());
      };
    });
  }
  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  applyFilter(): void {
    const filterValue = this.filterInput.nativeElement.value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }
  resetFilter(): void {
    this.filterInput.nativeElement.value = '';
    this.applyFilter();
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



  // prova
  openCreateDialog2() {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        modalTitle: 'Aggiungi Cliente',
        action: 'create',
        fields: [
          { key: 'name', label: 'Nome', placeholder: 'Inserisci nome' },
          { key: 'email', label: 'Email', type: 'email', placeholder: 'Inserisci email' },
          { key: 'phone', label: 'Telefono', placeholder: 'Inserisci telefono' },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.costumers.push({ id: this.costumers.length + 1, ...result });
      }
    });
  }

  openEditDialog2(costumer: any) {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        modalTitle: 'Modifica Cliente',
        action: 'edit',
        data: costumer,
        fields: [
          { key: 'name', label: 'Nome' },
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'phone', label: 'Telefono' },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.costumers.findIndex((c) => c.id === costumer.id);
        this.costumers[index] = { ...costumer, ...result };
      }
    });
  }

  openDeleteDialog2(costumer: any) {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      data: {
        modalTitle: 'Elimina Cliente',
        action: 'delete',
        data: costumer,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.costumers = this.costumers.filter((c) => c.id !== costumer.id);
      }
    });
  }

}
