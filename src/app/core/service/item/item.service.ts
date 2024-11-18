import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../model/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends RepoService {
  constructor(http: HttpClient) {
    super(http);
  }

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
  }
}
