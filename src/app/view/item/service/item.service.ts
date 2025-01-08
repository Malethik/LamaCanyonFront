import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RepoService } from '../../../core/service/repo/repo.service';
import { Item } from '../../../core/model/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends RepoService<Item> {
  constructor(http: HttpClient) {
    super(http, 'https://lamaback-owg8.onrender.com/item');
  }
  /* 
  override getAll(): Observable<Item[]> {
    return super.getAll('item');
  }
  override getOne(endpoint: string, id: number): Observable<Item> {
    return super.getOne(endpoint, id);
  }
  override create(endpoint: string, body: Item): Observable<Item> {
    return super.create(endpoint, body);
  }
  override update(endpoint: string, id: number, body: Item): Observable<Item> {
    return super.update(endpoint, id, body);
  }
  override delete(endpoint: string, id: number): Observable<Item> {
    return super.delete(endpoint, id);
  } */
}
