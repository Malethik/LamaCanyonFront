import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepoService<T> {
  /* private url = 'https://lamaback-owg8.onrender.com'; */
  constructor(
    private http: HttpClient,
    @Inject('API_URL') private url: string
  ) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }
  getOne(id: number): Observable<T> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
  create(body: T): Observable<T> {
    return this.http.post<T>(`${this.url}`, body);
  }
  update(id: number, body: T): Observable<any> {
    return this.http.patch<T>(`${this.url}/${id}`, body);
  }
  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.url}/${id}`);
  }
}
