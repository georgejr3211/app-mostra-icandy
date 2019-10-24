import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavController, LoadingController } from '@ionic/angular';
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
  isLoading = false;
  constructor(
    private menuCtrl: MenuController,
    private carrinhoCompra: CarrinhoCompraService,
    private usuario: UsuariosService,
    private router: Router,
    private navCtrl: NavController,
    public loadingController: LoadingController
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
    this.present();
    this.router.navigate([`/main/home`]);
    this.dismiss();
  }

  onNavigateCarrinho() {
    this.present();
    this.navCtrl.navigateForward([`/main/carrinho`]);
    this.dismiss();
  }

  onNavigateStatus() {
    this.present();
    const idUltimoPedido = localStorage.getItem('id-ultimo-pedido');
    this.navCtrl.navigateForward([`/main/status/${idUltimoPedido}`]);
    this.dismiss();
  }

  onNavigateHistorico() {
    this.present();
    this.router.navigate([`/main/historico`]);
    this.dismiss();
  }

  onNavigatePerfil() {
    this.present();
    this.router.navigate([`/main/perfil`]);
    this.dismiss();
  }

  onNavigateAdmin() {
    this.present();
    this.router.navigate([`/main/list`]);
    this.dismiss();
  }

  openSideMenu() {
    this.menuCtrl.open();
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: 'crescent',
      duration: 5000,
      message: 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

}
