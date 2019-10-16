import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizacoesPedidosService {
  private apiURL: string = environment.api;
  private subject = new BehaviorSubject<any[]>(null);

  constructor(private http: HttpClient) { }

  index(id) {
    const url = `${this.apiURL}/v1/localizacoes-pedidos/pedido/${id}`;
    return this.http.get(url).pipe(map((data: any) => data.value));
  }

  addLocalizacao(localizacao) {
    this.subject.next(localizacao);
  }

  getLocalizacao() {
    return this.subject;
  }
}


