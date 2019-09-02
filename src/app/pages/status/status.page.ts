import { PedidosService } from './../../providers/services/pedidos.service';
import { AuthService } from './../../providers/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestaurantesService } from 'src/app/providers/services/restaurantes.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit,AfterViewInit {

  formCRUD: FormGroup;
  auth$: Observable<any>;
  registros$: Observable<any>;
  
  constructor(
    private authService : AuthService, 
    private pedidosService: PedidosService,
    private restaurantesService: RestaurantesService) {
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
     this.pedidosService.index();
    this.auth$ = this.authService.auth('georgefeitosajr12@gmail.com', 'georgejr');
    this.registros$.subscribe((data) => {
      console.log('registro', data);
    })
  }

  ngAfterViewInit(){
    this.restaurantesService.index();

  }

}
