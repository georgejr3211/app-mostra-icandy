import { map } from "rxjs/operators";
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

  array = [];
  hasData = false;
  empty = false;

  imageArrow = "/assets/images/arrow.png";

  constructor(
    private facade: PedidosService,
    private facadeRestaurante: RestaurantesService,
    private facadeUsuarios: UsuariosService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.hasData = false;
    this.empty = false;
    this.usuario$ = this.facadeUsuarios.usuarioLogado();
    this.restaurante$ = this.facadeRestaurante.index();

    this.usuario$.subscribe(data => {
      if (data) {
        this.pedido$ = this.facade.findByUserHistorico(data.id).pipe(
          map(data => {
            if (data) {
              this.hasData = true;
              this.empty = true;
              if (!Array.isArray(data)) {
                return [data];
              } else {
                return data;
              }
            } else {
              this.empty = false;
              this.hasData = true;
            }
          })
        );
      }
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DetalhesHistoricoPage,
      componentProps: {
        custom_id: ev
      }
      // translucent: true
    });
    popover.present();
  }
}
