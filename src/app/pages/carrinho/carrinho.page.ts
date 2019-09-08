import { AuthService } from './../../providers/services/auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/internal/Observable';
import { CarrinhoCompraService } from '../../providers/services/carrinho-compra.service';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-carrinho",
  templateUrl: "./carrinho.page.html",
  styleUrls: ["./carrinho.page.scss"]
})
export class CarrinhoPage implements OnInit {

  auth$: Observable<string>;
  formCRUD: FormGroup;
  produtoCarrinho$: Observable<any[]>;
  totalCompra: number;

  disabled: boolean;

  constructor(private authService: AuthService, private carrinhoCompraService: CarrinhoCompraService) {
    this.formCRUD = new FormGroup(
      {
        id: new FormControl(null, {}),
        formas_pagamento_id: new FormControl(null, Validators.required),
        usuarios_id: new FormControl(null, {}),
        status_pedido_id: new FormControl(null, {}),
        observacao: new FormControl(null, {}),
        troco: new FormControl(null, {}),
        ativo: new FormControl(null, {}),
      },
      { updateOn: "change" }
    );

    this.onRefresh();
  }

  ngOnInit() {

  }

  onRefresh() {
    this.produtoCarrinho$ = this.carrinhoCompraService.getProdutosCarrinho()
      .pipe(
        map((data: any) => {
          if (!data) {
            return;
          }

          this.totalCompra = data.carrinho
            .map(produto => Number(produto.preco) * produto.qtd)
            .reduce((a, b) => a + b, 0)
            .toFixed(2);

          return data.carrinho;
        })
      );
  }

  hasTroco(value) {
    this.disabled = !value.detail.checked;
  }

}
