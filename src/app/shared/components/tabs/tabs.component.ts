import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CarrinhoCompraService } from 'src/app/providers/services/carrinho-compra.service';
import { map } from 'rxjs/operators';
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
    private usuario: UsuariosService,
    private router: Router,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.usuario$ = this.usuario.usuarioLogado();
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

  ionViewDidEnter() {
    
  }

  onNavigateHome() {

  }

  onNavigateCarrinho() {

  }

  onNavigateStatus() {
    const idUltimoPedido = localStorage.getItem('id-ultimo-pedido');
    this.navCtrl.navigateForward([`/main/status/${idUltimoPedido}`]);
  }

  onNavigateHistorico() {

  }

  onNavigatePerfil() {

  }

  onNavigateAdmin() {
    this.router.navigate([`/main/list`]);
  }

  openSideMenu() {
    this.menuCtrl.open();
  }

}
