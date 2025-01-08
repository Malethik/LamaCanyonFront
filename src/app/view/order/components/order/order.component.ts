import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Order } from '../../../../core/model/order';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { OrderService } from '../../service/order.service';
import { DeleteOrderDialogComponent } from '../delete-order-dialog/delete-order-dialog.component';
import { EditOrderDialogComponent } from '../edit-order-dialog/edit-order-dialog.component';
import { CreateOrderDialogComponent } from '../create-order-dialog/create-order-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    FooterComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  order: Order[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'address',
    'createdAt',
    'actions',
  ];
  dataSource = new MatTableDataSource<Order>();
  @ViewChild('filterInput') filterInput!: ElementRef;

  readonly dialog = inject(MatDialog);
  orderService = inject(OrderService);
  ngOnInit() {
    this.orderService.getAll().subscribe((data) => {
      console.log(data);
      this.order = data;
      this.dataSource.data = data;
      this.dataSource.filterPredicate = (data, filter: string) => {
        return data.id.toString().includes(filter.toLowerCase());
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
    this.dialog.open(CreateOrderDialogComponent, {
      width: '250px',
      data: {},
    });
  }

  openEditDialog(order: Order): void {
    this.dialog.open(EditOrderDialogComponent, {
      width: '250px',
      data: order,
    });
  }

  openDialog(order: Order): void {
    this.dialog.open(DeleteOrderDialogComponent, {
      width: '250px',
      data: { order: order },
    });
  }
}
