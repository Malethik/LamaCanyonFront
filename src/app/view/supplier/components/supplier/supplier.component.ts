import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { SupplierService } from '../../service/supplier.service';
import { Supplier } from '../../../../core/model/supplier';
import { CreateSupplierDialogComponent } from '../create-supplier-dialog/create-supplier-dialog.component';
import { EditSupplierDialogComponent } from '../edit-supplier-dialog/edit-supplier-dialog.component';
import { DeleteSupplierDialogComponent } from '../delete-supplier-dialog/delete-supplier-dialog.component';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    FooterComponent,
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css',
})
export class SupplierComponent implements OnInit {
  supplier: Supplier[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'address',
    'createdAt',
    'actions',
  ];
  dataSource = new MatTableDataSource<Supplier>();
  @ViewChild('filterInput') filterInput!: ElementRef;

  readonly dialog = inject(MatDialog);
  supplierService = inject(SupplierService);
  ngOnInit() {
    this.supplierService.getAll().subscribe((data) => {
      console.log(data);
      this.supplier = data;
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
    this.dialog.open(CreateSupplierDialogComponent, {
      width: '250px',
      data: {},
    });
  }

  openEditDialog(costumer: Supplier): void {
    this.dialog.open(EditSupplierDialogComponent, {
      width: '250px',
      data: costumer,
    });
  }

  openDialog(costumer: Supplier): void {
    this.dialog.open(DeleteSupplierDialogComponent, {
      width: '250px',
      data: { costumer: costumer },
    });
  }
}
