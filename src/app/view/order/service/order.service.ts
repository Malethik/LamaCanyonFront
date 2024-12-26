import { inject, Injectable } from '@angular/core';
import { RepoService } from '../../../core/service/repo/repo.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../../core/model/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends RepoService {
  endpoint: string = 'order';
  repoService = inject(RepoService);
  constructor(http: HttpClient) {
    super(http);
  }

  override getAll(): Observable<Order[]> {
    return super.getAll('order');
  }
  override getOne(endpoint: string, id: number): Observable<Order> {
    return super.getOne(endpoint, id);
  }
  override create(endpoint: string, body: Order): Observable<Order> {
    return this.repoService.create(endpoint, body);
  }
  override update(
    endpoint: string,
    id: number,
    body: Order
  ): Observable<Order> {
    return this.repoService.update(endpoint, id, body);
  }

  override delete(endpoint: string, id: number): Observable<Order> {
    return this.repoService.delete(endpoint, id);
  }
}
