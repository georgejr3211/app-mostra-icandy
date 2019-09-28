import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CarrinhoCompraService } from 'src/app/providers/services/carrinho-compra.service';
import { map } from 'rxjs/operators';
import { PedidosService } from 'src/app/providers/services/pedidos.service';
import { UsuariosService } from 'src/app/providers/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  totalItensCarrinho$: Observable<any>;
  usuario$: Observable<any>;
  constructor(
    private menuCtrl: MenuController,
    private carrinhoCompra: CarrinhoCompraService,
    private facade: PedidosService,
    private usuario: UsuariosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuario$ = this.usuario.usuarioLogado();
  }

  ionViewDidEnter() {
    this.totalItensCarrinho$ = this.carrinhoCompra.getProdutosCarrinho()
      .pipe(
        map((data: any) => {
          if (!data) {
            return 0;
          }

          return data.carrinho.map(item => item.qtd).reduce((a, b) => a + b, 0);
        })
      );
  }

  onNavigateStatus() {
    const idUltimoPedido = localStorage.getItem('id-ultimo-pedido');
    this.router.navigate([`/main/status/${idUltimoPedido}`]);
  }

  onNavigateAdmin() {
    this.router.navigate([`/main/list`]);
  }

  openSideMenu() {
    this.menuCtrl.open();
  }

}
