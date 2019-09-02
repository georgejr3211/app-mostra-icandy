import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoCompraService {

  carrinho$: Observable<any[]>;

  constructor() { }

  setCarrinho(carrinho) {
    this.carrinho$ = of(carrinho);
  }
}
