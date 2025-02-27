import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Costumers } from '../../../core/model/costumers';
import { RepoService } from '../../../core/service/repo/repo.service';

@Injectable({
  providedIn: 'root',
})
export class CostumersService extends RepoService<Costumers> {
  constructor(http: HttpClient) {
    super(http, 'https://lamaback-owg8.onrender.com/costumers');
  }

  /*  override getAll(): Observable<Costumers[]> {
    return super.getAll('costumers');
  }
  override getOne(endpoint: string, id: number): Observable<Costumers> {
    return super.getOne(endpoint, id);
  }
  override create(endpoint: string, body: Costumers): Observable<Costumers> {
    return this.repoService.create(endpoint, body);
  }
  override update(
    endpoint: string,
    id: number,
    body: Costumers
  ): Observable<Costumers> {
    return this.repoService.update(endpoint, id, body);
  }

  override delete(endpoint: string, id: number): Observable<Costumers> {
    return this.repoService.delete(endpoint, id);
  } */
}
