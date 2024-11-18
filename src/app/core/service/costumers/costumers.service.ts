import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { Observable } from 'rxjs';
import { Costumers } from '../../model/costumers';

@Injectable({
  providedIn: 'root',
})
export class CostumersService extends RepoService {
  constructor(http: HttpClient) {
    super(http);
  }

  override getAll(): Observable<Costumers[]> {
    return super.getAll('costumers');
  }
  override getOne(endpoint: string, id: number): Observable<Costumers> {
    return super.getOne(endpoint, id);
  }
  override create(endpoint: string, body: Costumers): Observable<Costumers> {
    return super.create(endpoint, body);
  }
  override update(
    endpoint: string,
    id: number,
    body: Costumers
  ): Observable<Costumers> {
    return super.update(endpoint, id, body);
  }
  override delete(endpoint: string, id: number): Observable<Costumers> {
    return super.delete(endpoint, id);
  }
}
