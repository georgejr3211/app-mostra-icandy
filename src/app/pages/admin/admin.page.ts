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

  formCRUDPedido: FormGroup;

  constructor(
    private facade: UsuariosService,
    private facadePedidos: PedidosService,
    private facadeStatus: StatusService,
    private facadePedidosProdutos: PedidosProdutosService,
    public alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController
  ) {
    localStorage.getItem("auth/token");

    this.status$ = this.facadeStatus.index();

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
    this.router.navigate(["/list"]);
    // this.modalCtrl.dismiss();
  }

  ngOnInit() {
    // console.log('usuariooo', this.formCRUDPedido.get('usuarios_id').value);
    // this.usuario$ = this.facade.find(this.formCRUDPedido.get('usuarios_id').value);
    // this.usuario$.subscribe(data => console.log('data usuario', data));
  }

  onAtualizar() {
    let payload = {
      id: this.dataParams.id,
      status_pedido_id: this.formCRUDPedido.get("status_pedido_id").value,
      ativo: this.formCRUDPedido.get("ativo").value
    };
    this.retorno$ = this.facadePedidos.update(payload);
    this.retorno$.subscribe(data => {
      if (data) {
        this.dismiss();
      } else {
        this.presentAlert();
      }
    })
  }

  async presentAlert() {
  const alert = await this.alertController.create({
    header: "Erro ao atualizar",
    message: "Contate os desenvolvedores!!",
    buttons: ["OK"]
  });
  await alert.present();
}

  updateAtivo(data?) {
    let checked;
    if (data) {
      checked = 1;
    } else {
      checked = 0;
    }
    this.formCRUDPedido.get("ativo").setValue(checked);
  }
}

// onSaveUsuario() {
//   if (
//     this.formCRUD.get("password").value ===
//     this.formCRUD.get("password2").value
//   ) {
//     this.formatTelefone();
//     this.formatCpf();
//     this.formCRUD.disable();
//     console.log("this.form", this.formCRUD.value);
//     this.retorno$ = this.facade.insert(this.formCRUD.value);
//     this.retorno$.subscribe(data => {
//       if (data) {
//         this.authService
//           .auth(this.formCRUD.value.email, this.formCRUD.value.password)
//           .subscribe(token => {
//             this.formCRUD.disable();
//             if (token) {
//               localStorage.setItem("auth/token", token);
//               this.router.navigate(["/main/home"]);
//             } else {
//               console.log("sem Token");
//               return;
//             }
//           });
//       } else {
//         this.presentAlertErro();
//         this.formCRUD.get("email").enable();
//         this.formCRUD.get("cpf").enable();
//         this.formCRUD.get("email").setValue("");
//         this.formCRUD.get("cpf").setValue("");
//       }
//     });
//   } else {
//     console.log("nao");
//     this.presentAlert();
//     this.formCRUD.get("password").setValue(null);
//     this.formCRUD.get("password2").setValue(null);
//   }
// }
// dismiss() {
//   this.router.navigate(["/login"]);
// }
// formatTelefone() {
//   this.telefone = this.formCRUD.get("telefone").value;
//   this.telefone = this.telefone.replace(/-/g, "");
//   this.telefone = this.telefone.replace(/[{()}]/g, "");
//   this.telefone = this.telefone.replace(/ /g, "");
//   this.formCRUD.get("telefone").setValue(this.telefone);
// }
// formatCpf() {
//   this.cpf = this.formCRUD.get("cpf").value;
//   this.cpf = this.cpf.replace(/-/g, "");
//   this.cpf = this.cpf.replace(/[{(.)}]/g, "");
//   this.formCRUD.get("cpf").setValue(this.cpf);
// }

// async presentAlert() {
//   const alert = await this.alertController.create({
//     header: "Erro",
//     message: "As senhas devem ser iguais!!",
//     buttons: ["OK"]
//   });
//   await alert.present();
// }
// async presentAlertErro() {
//   const alert = await this.alertController.create({
//     header: "Erro",
//     message: "Email ou CPF inválido ou já existentes!!",
//     buttons: ["OK"]
//   });
//   await alert.present();
// }

// this.formCRUD = new FormGroup(
//   {
//     nome: new FormControl(null),
//     sobrenome: new FormControl(null),
//     username: new FormControl(null),
//     password: new FormControl(null),
//     password2: new FormControl(null),
//     cpf: new FormControl(null),
//     email: new FormControl(null),
//     telefone: new FormControl(null),
//     perfis_id: new FormControl(1),
//     valor: new FormControl(null),
//     pedido: new FormControl(null)
//   },
//   { updateOn: "change" }
// );
