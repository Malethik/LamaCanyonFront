import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  private url = 'https://lamaback-owg8.onrender.com';
  constructor(private http: HttpClient) {}

  getAll(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/' + endpoint);
  }
  getOne(endpoint: string, id: number): Observable<any> {
    return this.http.get<any>(this.url + '/' + endpoint + '/' + id);
  }
  create(endpoint: string, body: any): Observable<any> {
    return this.http.post<any>(this.url + '/' + endpoint, body);
  }
  update(endpoint: string, id: number, body: any): Observable<any> {
    return this.http.put<any>(this.url + '/' + endpoint + '/' + id, body);
  }
  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + endpoint + '/' + id);
  }
}
