import { ModalController, NavController, IonInput } from "@ionic/angular";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from 'rxjs/internal/Observable';
import { CarrinhoCompraService } from '../../providers/services/carrinho-compra.service';
import { map } from 'rxjs/operators';
import { PedidosService } from 'src/app/providers/services/pedidos.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { LocalizacoesService } from '../../providers/services/localizacoes.service';
import { FormasPagamentoService } from 'src/app/providers/services/formas-pagamento.service';
import { PushNotificationService } from 'src/app/providers/services/push-notification.service';
import { UsuariosService } from 'src/app/providers/services/usuarios.service';
import { LocalizacoesPedidosService } from 'src/app/providers/services/localizacoes-pedidos.service';

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
        message: "O CPF deve ter 11 números."
      }
    ]
  };

  formCRUD: FormGroup;
  formCRUDCPF: FormGroup;

  auth$: Observable<string>;
  usuario$: Observable<any>;
  produtoCarrinho$: Observable<any[]>;
  // localizacoes$: Observable<any[]>;
  formasPagamento$: Observable<any[]>;

  cpf: string;
  totalCompra: number;
  disabled: boolean;
  adminsDevices = [];
  canAdd = true;
  pedidoLoc$: Observable<any>;

  @ViewChild('troco', { static: false }) troco: IonInput;

  constructor(
    private carrinhoCompraService: CarrinhoCompraService,
    private pedidoService: PedidosService,
    // private localizacoesService: LocalizacoesService,
    private localizacaoService: LocalizacoesPedidosService,
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

  ngOnInit() { }

  ionViewDidEnter() {
    this.pedidoLoc$ = this.localizacaoService.getLocalizacao();
    this.usuario.indexAdminDevices().subscribe(data => {
      if (!data) { return; }
      this.adminsDevices = data.filter(user => user.device_id).map(user => user.device_id);
    });
    this.onRefresh();
  }

  onRefresh() {
    // this.localizacoes$ = this.localizacoesService.index();
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
    this.troco.setFocus();

    const disabled = !value.detail.checked;
    if (disabled) {
      this.formCRUD.get("troco").setValue(null);
      this.formCRUD.get("troco").disable();
    } else {
      this.formCRUD.get("troco").enable();
    }
  }

  createPedido() {
    if (this.formCRUDCPF.get('cpf').value) {
      this.usuario$ = this.usuario.usuarioLogado();
      this.usuario$.subscribe(data => {
        if (data) {
          this.formatCpf();
          this.usuario
            .update({ id: data.id, cpf: this.formCRUDCPF.get('cpf').value })
            .subscribe(data => {
              if (data) {
                if (data.length) {
                  console.log("tudo nos conformes", data);
                  this.canCreatePedido();
                } else {
                  console.log("Ocorreu um erro", data);
                  this.canNotCreatePedido();
                }
              } else {
                console.log("Ocorreu um erro", data);
                this.canNotCreatePedido();
              }
            });
        }
      });
    } else {
      this.canCreatePedido();
    }
  }

  canNotCreatePedido() {
    this.formCRUDCPF.get("cpf").setValue(null);
    this.formCRUDCPF.get("cpf").setValidators(Validators.minLength(14));
  }

  canCreatePedido() {
    const pedido = JSON.parse(localStorage.getItem('user/localizacao'));

    const data = { ...this.formCRUD.value, ...pedido };
    this.pedidoService.insert(data).subscribe(data => {
      localStorage.setItem("id-ultimo-pedido", data.id);
      localStorage.removeItem('user/localizacao');
      this.localizacaoService.addLocalizacao(null);
      this.router.navigate([`./main/status/${data.id}`]);
      this.push.sendMessageToAdmins(
        this.adminsDevices,
        "Um novo pedido foi realizado!"
      );
    },
      async data => {
        console.log(data);

        const message = `
          Sentimos muito, os seguintes produtos estão fora de estoque: <br/>
          ${data.error.map(item => {
          return `<br /> Item: ${item.nome}<br /> Quantidade disponível: ${item.qtd_estoque} <br />`;
        })}
        `;

        const alert = await this.alertController.create({
          message, buttons: ['Ok']
        });
        alert.present();
      });
    this.carrinhoCompraService.addProdutoCarrinho({ carrinho: [], qtd: 0 });
    this.formCRUDCPF.get("cpf").setValue(null);
  }

  formatCpf() {
    this.cpf = this.formCRUDCPF.get("cpf").value;
    this.cpf = this.cpf.replace(/-/g, "");
    this.cpf = this.cpf.replace(/[{(.)}]/g, "");
    this.formCRUDCPF.get("cpf").setValidators(Validators.minLength(1));
    this.formCRUDCPF.get("cpf").setValue(this.cpf);
  }

  escolherLocalEntrega() {
    this.nav.navigateForward("/main/local-entrega");
  }
}
