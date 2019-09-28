import { environment } from './../../../environments/environment.prod';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestaurantesService } from 'src/app/providers/services/restaurantes.service';

import { AuthService } from './../../providers/services/auth.service';
import { AvaliacoesService } from './../../providers/services/avaliacoes.service';
import { PedidosService } from './../../providers/services/pedidos.service';
import { StatusService } from './../../providers/services/status.service';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit, AfterViewInit {

  imageLogo = '/assets/images/ArtesNeW.jpeg';
  pedido$: Observable<any>;
  auth$: Observable<any>;
  restaurantes$: Observable<any>;
  avaliacoes$: Observable<any>;
  status$: Observable<any>;
  socket;
  apiUrl = environment.api;
  numeroTelefone = '(34) 99977-1973';
  constructor(
    private authService: AuthService,
    private pedidosService: PedidosService,
    private restaurantesService: RestaurantesService,
    private avaliacoesService: AvaliacoesService,
    private statusService: StatusService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.socket = io(this.apiUrl);
    const { id } = this.activatedRoute.snapshot.params;
    this.pedido$ = this.pedidosService.find(id);
    this.status$ = this.statusService.index();
    this.avaliacoes$ = this.avaliacoesService.index();
    this.restaurantes$ = this.restaurantesService.index();
    this.socket.on(id, () => {
      this.status$ = this.statusService.index();
    });
  }

  ngAfterViewInit() {
  }

}
