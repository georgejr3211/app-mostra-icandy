import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class PedidosProdutosService {
  private apiURL: string = environment.api;
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(this.apiURL);
  }

  index() {

    const url = `${this.apiURL}/v1/pedidos-produtos/`;
    return this.http.get(url).pipe(map((data: any) => data.value));
  }

  findPedido(payload?) {
    const url = `${this.apiURL}/v1/pedidos-produtos/${payload}`;
    console.log(url);
    return this.http.get(url).pipe(map((data: any) => data.value));
  }
}


