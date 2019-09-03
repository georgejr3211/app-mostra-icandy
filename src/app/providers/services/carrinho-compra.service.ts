import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoCompraService {

  private subject = new Subject<any>();

  constructor() { }

  addProdutoCarrinho(produtoCarrinho) {
    this.subject.next(produtoCarrinho);
  }

  getProdutosCarrinho() {
    return this.subject.asObservable();
  }


}
