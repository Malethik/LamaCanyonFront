import { Routes } from '@angular/router';
import { CostumersComponent } from './view/costumers/costumers.component';
import { SupplierComponent } from './view/supplier/supplier.component';
import { ItemComponent } from './view/item/item.component';
import { OrderComponent } from './view/order/order.component';

export const routes: Routes = [
  { path: 'clienti', component: CostumersComponent },
  { path: 'fornitori', component: SupplierComponent },
  { path: 'prodotti', component: ItemComponent },
  { path: 'ordini', component: OrderComponent },
  { path: '', redirectTo: '/prodotti', pathMatch: 'full' },
  { path: '**', redirectTo: '/prodotti' },
];
