import { Component, OnInit } from "@angular/core";
import { PopoverController, NavParams } from "@ionic/angular";
import { Observable } from "rxjs";
import { PedidosProdutosService } from "../providers/services/pedidos-produtos.service";

@Component({
  selector: "app-detalhes-historico",
  templateUrl: "./detalhes-historico.page.html",
  styleUrls: ["./detalhes-historico.page.scss"]
})
export class DetalhesHistoricoPage implements OnInit {
  passedId = null;
  pedido$: Observable<any>;
  quantidade = 0;
  preco: number;

  constructor(
    private facade: PedidosProdutosService,
    public popoverController: PopoverController,
    private navParams: NavParams
  ) {
    this.passedId = this.navParams.get("custom_id");
    console.log("AOBA", this.passedId);
  }

  ngOnInit() {
    this.pedido$ = this.facade.findPedido(this.passedId);
    this.pedido$.subscribe(data => {
      data.map(element => {
        this.preco = parseInt(element.produto.preco);
        this.quantidade = this.quantidade + this.preco;
        console.log(this.quantidade);
      })
    });
  }

  dismiss() {
    this.popoverController.dismiss();
  }
}
