import { UsuariosService } from "./../../providers/services/usuarios.service";
import { PedidosService } from "./../../providers/services/pedidos.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { RestaurantesService } from "src/app/providers/services/restaurantes.service";
import { PopoverController } from "@ionic/angular";
import { DetalhesHistoricoPage } from "src/app/detalhes-historico/detalhes-historico.page";

@Component({
  selector: "app-historico",
  templateUrl: "./historico.page.html",
  styleUrls: ["./historico.page.scss"]
})
export class HistoricoPage implements OnInit {
  pedido$: Observable<any>;
  restaurante$: Observable<any>;
  usuario$: Observable<any>;

  constructor(
    private facade: PedidosService,
    private facadeRestaurante: RestaurantesService,
    private facadeUsuarios: UsuariosService,
    public popoverController: PopoverController
  ) {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.usuario$ = this.facadeUsuarios.usuarioLogado();
    this.restaurante$ = this.facadeRestaurante.index();

    this.usuario$.subscribe(data => {
      if (data) {
        this.pedido$ = this.facade.findByUser(data.id);
        }
      });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DetalhesHistoricoPage,
      componentProps: {
        custom_id: ev
      },
      // translucent: true
    });
    popover.present();
  }
}
