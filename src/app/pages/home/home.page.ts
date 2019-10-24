import { Component, OnInit, OnDestroy, Injectable } from "@angular/core";
import { UsuariosService } from "src/app/providers/services/usuarios.service";
import { Observable } from "rxjs";
import { ProdutosService } from "src/app/providers/services/produtos.service";
import { environment } from "../../../environments/environment";
import { CarrinhoCompraService } from "src/app/providers/services/carrinho-compra.service";
import { PushNotificationService } from "src/app/providers/services/push-notification.service";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit, OnDestroy {
  images = environment.api + "/assets/images/";
  usuario$: Observable<any>;
  produtos$: Observable<any>;
  teste$: Observable<any>;
  produtoCarrinho = [];
  userId = `01d17a8c-2988-43a9-b549-c163cfe9fc27`;
  mensagem = ``;
  zeraQtd: boolean;

  constructor(
    private userService: UsuariosService,
    private produtosService: ProdutosService,
    private carrinhoCompraService: CarrinhoCompraService,
    private push: PushNotificationService,
    private router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.usuario$ = this.userService.usuarioLogado();

    if (this.carrinhoCompraService.zeraQtd) {
      this.produtoCarrinho = [];
    }

    this.usuario$.subscribe(async data => {
      if (!data) {
        return;
      }
      const { userId } = await this.push.getId();
      this.userService.update({ id: data.id, device_id: userId }).subscribe();
    });
    this.onRefresh();
  }

  onRefresh(event?) {
    this.produtos$ = this.produtosService.index();

    this.produtos$.subscribe(data => {
      if (data) {
        // if (event) {
        //   event.detail.complete();
        // }
        event.target.disabled = true;
        event.target.complete();
        setTimeout(() => {
          event.target.disabled = false;
        }, 100);
      }
    });
  }

  onClickCart() {
    this.router.navigate(["/main/carrinho"]);
  }

  onChangeValor(tipo, produto) {
    const index = this.produtoCarrinho.findIndex(
      item => item.id === produto.id
    );
    let qtd = 0;
    switch (tipo) {
      case "add":
        if (index > -1) {
          qtd = this.produtoCarrinho[index].qtd + 1;
          this.produtoCarrinho[index] = { ...produto, qtd };
        } else {
          this.produtoCarrinho.push({ ...produto, qtd: 1 });
        }
        this.presentToast();
        break;
      case "remove":
        if (this.produtoCarrinho[index]) {
          qtd = this.produtoCarrinho[index].qtd - 1;
          if (qtd < 0) {
            qtd = 0;
            this.produtoCarrinho = [];
          } else {
            this.produtoCarrinho[index] = { ...produto, qtd };
          }
        }

        break;
    }
    this.carrinhoCompraService.addProdutoCarrinho({
      carrinho: this.produtoCarrinho,
      qtd
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Produto adicionado ao carrinho.",
      duration: 200,
      color: "primary",
      buttons: [
        {
          side: "start",
          icon: "cart"
        }
      ]
    });
    toast.present();
  }

  countQtdItemCarrinho(idProduto) {
    let data = this.produtoCarrinho.find(item => item.id === idProduto);

    return data;
  }

  totalProduto(preco, idProduto) {
    let data = this.produtoCarrinho.find(item => item.id === idProduto);

    if (!data || data.qtd === 0) {
      return preco;
    }

    return (data.preco * data.qtd).toFixed(2);
  }

  onSearch(value) {
    this.produtos$ = this.produtosService.index({ s: value });
  }

  sendMessage() {
    this.push.sendMessage(this.userId, this.mensagem);
  }

  ngOnDestroy() {}
}
