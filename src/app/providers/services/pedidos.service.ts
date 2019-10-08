import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiURL: string = environment.api;
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.apiURL);
  }

  index() {

    const url = `${this.apiURL}/v1/pedidos/`;
    return this.http.get(url).pipe(map((data: any) => data.value));
  }

  find(payload?) {
    const url = `${this.apiURL}/v1/pedidos/${payload}`;
    return this.http.get(url).pipe(map((data: any) => data.value));
  }

  findByUser(payload?) {
    const url = `${this.apiURL}/v1/pedidos/user/${payload}`;
    return this.http.get(url).pipe(map((data: any) => data.value[data.value.length - 1]));
  }

  insert(payload?) {
    const url = `${this.apiURL}/v1/pedidos`;

    return this.http.post(url, payload).pipe(map((data: any) => data.value));
  }

  update(payload) {
    this.socket.emit('update-status', payload.id);
   
    const url = `${this.apiURL}/v1/pedidos/${payload.id}`;
    return this.http.put(url, payload).pipe(map((data: any) => data.value));
  }
}


