import { AuthService } from './../../providers/services/auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/internal/Observable';
import { CarrinhoCompraService } from '../../providers/services/carrinho-compra.service';
import { map } from 'rxjs/operators';
import { PedidosService } from 'src/app/providers/services/pedidos.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(
    private carrinhoCompraService: CarrinhoCompraService,
    private pedidoService: PedidosService,
    public alertController: AlertController,
    private router: Router
  ) {

    this.formCRUD = new FormGroup(
      {
        id: new FormControl(null, {}),
        formas_pagamento_id: new FormControl(1, Validators.required),
        observacao: new FormControl(null, {}),
        troco: new FormControl({ value: null, disabled: true }),
        itens: new FormControl(null, Validators.required),
        localEntrega: new FormControl(1, Validators.required),
        valorTotal: new FormControl(null),
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

          this.formCRUD.get('itens').setValue(data.carrinho);
          this.formCRUD.get('valorTotal').setValue(this.totalCompra);

          return data.carrinho;
        })
      );
  }

  hasTroco(value) {
    const disabled = !value.detail.checked;
    if (disabled) {
      this.formCRUD.get('troco').setValue(null)
      this.formCRUD.get('troco').disable();
    } else {
      this.formCRUD.get('troco').enable();
    }
  }

  createPedido() {
    const data = this.formCRUD.value;
    this.pedidoService.insert(data).subscribe(data => {
      this.router.navigate([`/status/${data.id}`]);
    });
  }

  updateStatus() {
    this.pedidoService.update({
      id: 14,
      status_pedido_id: 1 + Math.floor(Math.random() * Math.floor(4))
    }).subscribe();
  }

}
