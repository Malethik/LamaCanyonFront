import { inject, Injectable } from '@angular/core';
import { RepoService } from '../../../core/service/repo/repo.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../../../core/model/supplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends RepoService {
  endpoint: string = 'supplier';
  repoService = inject(RepoService);
  constructor(http: HttpClient) {
    super(http);
  }

  override getAll(): Observable<Supplier[]> {
    return super.getAll('supplier');
  }
  override getOne(endpoint: string, id: number): Observable<Supplier> {
    return super.getOne(endpoint, id);
  }
  override create(endpoint: string, body: Supplier): Observable<Supplier> {
    return this.repoService.create(endpoint, body);
  }
  override update(
    endpoint: string,
    id: number,
    body: Supplier
  ): Observable<Supplier> {
    return this.repoService.update(endpoint, id, body);
  }

  override delete(endpoint: string, id: number): Observable<Supplier> {
    return this.repoService.delete(endpoint, id);
  }
}
