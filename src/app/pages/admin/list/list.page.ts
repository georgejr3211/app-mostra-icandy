import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/providers/services/pedidos.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  hasData = false;
  pedidos$: Observable<any>;

  constructor(
    private facade: PedidosService,
    private router: Router
  ) {
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.onRefresh();
  }

  onRefresh(event?) {
    this.pedidos$ = this.facade.index();
    if (event) {
      this.pedidos$.subscribe(data => {
        if (data) {
          event.detail.complete();
        }
      });
    }

  }

  buscarId(id) {
    this.router.navigate([`/main/admin/${id}`]);
  }

  cadastrar() {
    this.router.navigate([`/produtos-admin`]);
  }

}
