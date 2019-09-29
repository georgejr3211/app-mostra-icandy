import { PedidosProdutosService } from "./../../providers/services/pedidos-produtos.service";
import { StatusService } from "./../../providers/services/status.service";
import { Observable } from "rxjs/internal/Observable";
import { UsuariosService } from "../../providers/services/usuarios.service";
import { ProdutosService } from "./../../providers/services/produtos.service";
import { AlertController, ModalController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../providers/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PedidosService } from "src/app/providers/services/pedidos.service";
import { PushNotificationService } from 'src/app/providers/services/push-notification.service';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"]
})
export class AdminPage implements OnInit {
  dataParams;
  hasData;

  pedidoId = false;
  retorno$: Observable<any>;
  pedido$: Observable<any>;
  produtos$: Observable<any>;
  usuario$: Observable<any>;
  status$: Observable<any>;

  troco = null;
  preco;
  total = 0;
  telefone;
  cpf;
  deviceId: string;
  moreInfo = false;

  formCRUDUsuario: FormGroup;
  formCRUDPedido: FormGroup;

  constructor(
    private facadeUsuarios: UsuariosService,
    private facadePedidos: PedidosService,
    private facadeStatus: StatusService,
    private facadePedidosProdutos: PedidosProdutosService,
    public alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private push: PushNotificationService
  ) {
    localStorage.getItem("auth/token");

    this.status$ = this.facadeStatus.index();

    this.formCRUDUsuario = new FormGroup(
      {
        ativo: new FormControl(null)
      },
      { updateOn: "change" }
    );

    this.formCRUDPedido = new FormGroup(
      {
        id: new FormControl(null),
        formas_pagamento_id: new FormControl(null),
        usuarios_id: new FormControl(null),
        status_pedido_id: new FormControl(null),
        observacao: new FormControl(null),
        troco: new FormControl(null),
        ativo: new FormControl(null)
      },
      { updateOn: "change" }
    );
    this.dataParams = this.activatedRoute.snapshot.params;
    this.pedido$ = this.facadePedidos.find(this.dataParams.id);
    this.pedido$.subscribe(data => {
      if (data) {
        this.pedidoId = true;
        this.deviceId = data.usuario.device_id;
        this.formCRUDPedido.patchValue(data);
      }
    });
    this.produtos$ = this.facadePedidosProdutos.findPedido(this.dataParams.id);
    this.produtos$.subscribe(data => {
      data.map(element => {
        this.preco =
          parseFloat(element.produto.preco) * parseInt(element.quantidade);
        this.total = this.total + this.preco;
        this.total = parseFloat(this.total.toFixed(2));
        if (
          this.formCRUDPedido.get("troco").value > 0 &&
          this.formCRUDPedido.get("troco").value < 101
        ) {
          this.troco = this.formCRUDPedido.get("troco").value - this.total;
        }
      });
    });
  }

  dismiss() {
    this.router.navigate(['/main/list']);
  }

  ngOnInit() { }

  ionViewDidEnter() {
    
  }

  onAtualizarPedido() {
    let payload = {
      id: this.dataParams.id,
      status_pedido_id: this.formCRUDPedido.get("status_pedido_id").value,
      ativo: this.formCRUDPedido.get("ativo").value
    };
    this.push.sendMessage(this.deviceId, 'Corre lá no App!! Seu pedido acabou de mudar de status');
    this.retorno$ = this.facadePedidos.update(payload);
    this.retorno$.subscribe(data => {
      if (data) {
        this.dismiss();
      } else {
        this.presentAlert();
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Erro ao atualizar",
      message: "Contate os desenvolvedores!!",
      buttons: ["OK"]
    });
    await alert.present();
  }

  updateAtivoPedido(data?) {
    let checked;
    if (data) {
      checked = 1;
    } else {
      checked = 0;
    }
    this.formCRUDPedido.get("ativo").setValue(checked);
  }

  showMore() {
    this.usuario$ = this.facadeUsuarios.find(this.formCRUDPedido.get('usuarios_id').value);
    this.usuario$.subscribe(data => {
      if (data) {
        this.moreInfo = true;
        this.formCRUDUsuario.patchValue(data);
      }
    })
  }

  updateAtivoUsuario(data?) {
    let checked;
    if (data) {
      checked = 1;
    } else {
      checked = 0;
    }
    this.formCRUDUsuario.get("ativo").setValue(checked);
  }

  onAtualizarUsuario() {
    let payload = {
      id: this.formCRUDPedido.get('usuarios_id').value,
      ativo: this.formCRUDUsuario.get('ativo').value
    };
    this.retorno$ = this.facadeUsuarios.update(payload);
    this.retorno$.subscribe(data => {
      if (data) {
        this.dismiss();
      } else {
        this.presentAlert();
      }
    });
  }
}

