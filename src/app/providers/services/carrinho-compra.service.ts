import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoCompraService {

  private subject = new BehaviorSubject<any[]>(null);

  constructor() {
  }

  addProdutoCarrinho(produtoCarrinho) {
    this.subject.next(produtoCarrinho);
  }

  getProdutosCarrinho() {
    return this.subject;
  }


}
