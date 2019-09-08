import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestaurantesService } from 'src/app/providers/services/restaurantes.service';

import { AuthService } from './../../providers/services/auth.service';
import { AvaliacoesService } from './../../providers/services/avaliacoes.service';
import { PedidosService } from './../../providers/services/pedidos.service';
import { StatusService } from './../../providers/services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit,AfterViewInit {
  
  imageLogo = '/assets/images/confeitaria-logo.png';
  pedido$: Observable<any>;
  auth$: Observable<any>;
  restaurantes$: Observable<any>;
  avaliacoes$: Observable<any>;
  status$: Observable<any>;
  
  constructor(
    private authService : AuthService, 
    private pedidosService: PedidosService,
    private restaurantesService: RestaurantesService,
    private avaliacoesService: AvaliacoesService,
    private statusService: StatusService) {
    }

   ngOnInit() {
     this.pedido$ = this.pedidosService.find(1);
     this.avaliacoes$ = this.avaliacoesService.index();
     this.restaurantes$ = this.restaurantesService.index();
     this.status$ = this.statusService.index();
  }
  
  ngAfterViewInit(){
  }

}
