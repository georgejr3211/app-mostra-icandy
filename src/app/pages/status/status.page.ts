import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  formCRUD: FormGroup;
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
    this.formCRUD = new FormGroup({
      id: new FormControl(null, Validators.required),
      formas_pagamento_id: new FormControl(null, Validators.required),
      usuarios_id: new FormControl(null, Validators.required),
      status_pedido_id: new FormControl(null, Validators.required),
      observacao: new FormControl(null, Validators.required),
      troco: new FormControl(null, Validators.required),
      ativo: new FormControl(null, Validators.required)
    }, {updateOn: 'change'})
   }

   ngOnInit() {
  }
  
  ngAfterViewInit(){
    this.pedidosService.index();
    this.avaliacoes$ = this.avaliacoesService.index();
    this.restaurantes$ = this.restaurantesService.index();
    this.status$ = this.statusService.index();
    this.status$.subscribe(data => console.log(data));
  }

}
