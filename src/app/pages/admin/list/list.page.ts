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

  pedidos$: Observable<any>;

  constructor(
    private facade: PedidosService,
    private router: Router
    ) { 
    this.pedidos$ = this.facade.index();
  }

  ngOnInit() {
  }

  buscarId(id) {
    this.router.navigate([`./admin/${id}`]);
  }

}
