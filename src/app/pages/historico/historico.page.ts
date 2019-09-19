import { UsuariosService } from './../../providers/services/usuarios.service';
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
  usuario$: Observable<any>;

  constructor(
    private facade: PedidosService, 
    private facadeRestaurante: RestaurantesService,
    private facadeUsuarios: UsuariosService) { 
    this.usuario$ = this.facadeUsuarios.usuarioLogado()
    this.restaurante$ = this.facadeRestaurante.index();
  }
  
  ngOnInit() {
    this.usuario$.subscribe(data => {
      if (data) {
        console.log('usuarioooo', data.id);
        this.pedido$ = this.facade.findByUser(data.id);
      }
    })
  }

}
