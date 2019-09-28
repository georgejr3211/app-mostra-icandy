import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiURL: string = environment.api;

  constructor(private http: HttpClient) { }

  index() {
    const url = `${this.apiURL}/v1/categorias`;
    return this.http.get(url).pipe(map((data: any) => data.value));
  }

  find(id?) {
    const url = `${this.apiURL}/v1/categorias/${id}`;
    return this.http.get(url).pipe(map((data: any) => data.value));
  }

  insert(payload?) {
    const url = `${this.apiURL}/v1/categorias`;
    return this.http.post(url, payload).pipe(map((data: any) => data.value));
  }

  update(payload?) {
    const url = `${this.apiURL}/v1/categorias/${payload.id}`;
    console.log('url', url);
    return this.http.put(url, payload).pipe(map((data: any) => data.value));
  }
}
