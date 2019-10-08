import { UsuariosService } from 'src/app/providers/services/usuarios.service';
import { environment } from './../../../environments/environment.prod';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestaurantesService } from 'src/app/providers/services/restaurantes.service';

import { AvaliacoesService } from './../../providers/services/avaliacoes.service';
import { PedidosService } from './../../providers/services/pedidos.service';
import { StatusService } from './../../providers/services/status.service';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { LoadingController, ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  usuario$: Observable<any>;
  pedido$: Observable<any>;
  auth$: Observable<any>;
  restaurantes$: Observable<any>;
  avaliacoes$: Observable<any>;
  status$: Observable<any>;

  socket;
  imageLogo = '/assets/images/ArtesNeW.jpeg';
  apiUrl = environment.api;
  whatsAppPhone = 'https://api.whatsapp.com/send?phone=5534999771973&text=Olá, iCandy';
  artesNew = 'https://www.instagram.com/artesnew_confeitaria';


  constructor(
    private pedidosService: PedidosService,
    private restaurantesService: RestaurantesService,
    private avaliacoesService: AvaliacoesService,
    private usuariosService: UsuariosService,
    private statusService: StatusService,
    private activatedRoute: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.socket = io(this.apiUrl);
    const { id } = this.activatedRoute.snapshot.params;
    this.usuario$ = this.usuariosService.usuarioLogado();
    this.usuario$.subscribe(data => {
      if (data) {
        this.pedido$ = this.pedidosService.findByUser(data.id);
      }
    });
    this.status$ = this.statusService.index();
    this.avaliacoes$ = this.avaliacoesService.index();
    this.restaurantes$ = this.restaurantesService.index();

    this.socket.on(id, () => {
      this.status$ = this.statusService.index();
    });

  }

}
