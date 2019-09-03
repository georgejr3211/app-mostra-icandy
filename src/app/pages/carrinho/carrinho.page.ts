import { AuthService } from './../../providers/services/auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/internal/Observable';
import { CarrinhoCompraService } from '../../providers/services/carrinho-compra.service';

@Component({
  selector: "app-carrinho",
  templateUrl: "./carrinho.page.html",
  styleUrls: ["./carrinho.page.scss"]
})
export class CarrinhoPage implements OnInit {

  auth$: Observable<string>;
  formCRUD: FormGroup;
  produtoCarrinho$: Observable<any[]>;

  constructor(private authService: AuthService, private carrinhoCompraService: CarrinhoCompraService) {
    this.formCRUD = new FormGroup(
      {
        id: new FormControl(null, {}),
        formas_pagamento_id: new FormControl(null, Validators.required),
        usuarios_id: new FormControl(null, {}),
        status_pedido_id: new FormControl(null, {}),
        observacao: new FormControl(null, {}),
        troco: new FormControl(null, {}),
        ativo: new FormControl(null, {})
      },
      { updateOn: "change" }
    );
  }

  ngOnInit() {
    this.produtoCarrinho$ = this.carrinhoCompraService.getProdutosCarrinho();
  }
}
