import { PedidosService } from './../../providers/services/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestaurantesService } from 'src/app/providers/services/restaurantes.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  pedido$: Observable<any>;
  restaurante$: Observable<any>;

  constructor(private facade: PedidosService, private facadeRestaurante: RestaurantesService) { 
    this.pedido$ = this.facade.findByUser(1);
    this.restaurante$ = this.facadeRestaurante.index();
  }

  ngOnInit() {
  }

}
