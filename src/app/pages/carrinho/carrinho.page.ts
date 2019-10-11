import { ModalController, NavController } from "@ionic/angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, ViewChild, Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { CarrinhoCompraService } from "../../providers/services/carrinho-compra.service";
import { map } from "rxjs/operators";
import { PedidosService } from "src/app/providers/services/pedidos.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { LocalizacoesService } from "../../providers/services/localizacoes.service";
import { FormasPagamentoService } from "src/app/providers/services/formas-pagamento.service";
import { HomePage } from "../home/home.page";
import { PushNotificationService } from "src/app/providers/services/push-notification.service";
import { UsuariosService } from "src/app/providers/services/usuarios.service";
import { LocalEntregaPage } from "../local-entrega/local-entrega.page";

@Component({
  selector: "app-carrinho",
  templateUrl: "./carrinho.page.html",
  styleUrls: ["./carrinho.page.scss"]
})
export class CarrinhoPage implements OnInit {
  validation_messages = {
    cpf: [
      {
        type: "minlength",
        message: "O CPF deve ter 11 caracteres."
      }
    ]
  };

  formCRUD: FormGroup;
  formCRUDCPF: FormGroup;

  auth$: Observable<string>;
  usuario$: Observable<any>;
  produtoCarrinho$: Observable<any[]>;
  localizacoes$: Observable<any[]>;
  formasPagamento$: Observable<any[]>;

  cpf: string;
  totalCompra: number;
  disabled: boolean;
  adminsDevices = [];

  constructor(
    private carrinhoCompraService: CarrinhoCompraService,
    private pedidoService: PedidosService,
    private localizacoesService: LocalizacoesService,
    private formasPagamentoService: FormasPagamentoService,
    public alertController: AlertController,
    private router: Router,
    private push: PushNotificationService,
    private usuario: UsuariosService,
    private modalCtrl: ModalController,
    private nav: NavController
  ) {
    this.formCRUD = new FormGroup(
      {
        id: new FormControl(null, {}),
        formas_pagamento_id: new FormControl(1, Validators.required),
        observacao: new FormControl(null, {}),
        troco: new FormControl({ value: null, disabled: true }),
        itens: new FormControl(null, Validators.required),
        localEntrega: new FormControl(3, Validators.required),
        valorTotal: new FormControl(null)
      },
      { updateOn: "change" }
    );

    this.formCRUDCPF = new FormGroup(
      {
        cpf: new FormControl(
          null,
          Validators.compose([Validators.minLength(14)])
        )
      },
      { updateOn: "change" }
    );
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.usuario.indexAdminDevices().subscribe(data => {
      if (!data) {
        return;
      }
      this.adminsDevices = data
        .filter(user => user.device_id)
        .map(user => user.device_id);
    });
    this.onRefresh();
  }

  onRefresh() {
    this.localizacoes$ = this.localizacoesService.index();
    this.formasPagamento$ = this.formasPagamentoService.index();
    this.produtoCarrinho$ = this.carrinhoCompraService
      .getProdutosCarrinho()
      .pipe(
        map((data: any) => {
          if (!data) {
            return;
          }

          this.totalCompra = data.carrinho
            .map(produto => Number(produto.preco) * produto.qtd)
            .reduce((a, b) => a + b, 0)
            .toFixed(2);

          this.formCRUD.get("itens").setValue(data.carrinho);
          this.formCRUD.get("valorTotal").setValue(this.totalCompra);

          return data.carrinho;
        })
      );
  }

  hasTroco(value) {
    const disabled = !value.detail.checked;
    if (disabled) {
      this.formCRUD.get("troco").setValue(null);
      this.formCRUD.get("troco").disable();
    } else {
      this.formCRUD.get("troco").enable();
    }
  }

  createPedido() {
    if (this.formCRUDCPF.value) {
      console.log('entrou');
      this.usuario$ = this.usuario.usuarioLogado();
      this.usuario$.subscribe(data => {
        if (data) {
          this.formatCpf();
          console.log(data.id, this.formCRUDCPF.get('cpf').value);
          this.usuario.update({id: data.id, cpf: this.formCRUDCPF.get('cpf').value }).subscribe(data => console.log('data',data));
        }
      });
    }
    // const data = this.formCRUD.value;
    // this.pedidoService.insert(data).subscribe(data => {
    //   localStorage.setItem("id-ultimo-pedido", data.id);
    //   this.router.navigate([`./main/status/${data.id}`]);
    // });
    // this.push.sendMessageToAdmins(
    //   this.adminsDevices,
    //   "Um novo pedido foi realizado!"
    // );
    // this.carrinhoCompraService.addProdutoCarrinho({ carrinho: [], qtd: 0 });
  }

  formatCpf() {
    this.cpf = this.formCRUDCPF.get("cpf").value;
    this.cpf = this.cpf.replace(/-/g, "");
    this.cpf = this.cpf.replace(/[{(.)}]/g, "");
    this.formCRUDCPF.get("cpf").setValue(this.cpf);
  }

  escolherLocalEntrega() {
    this.nav.navigateForward("/main/local-entrega");
  }
}
