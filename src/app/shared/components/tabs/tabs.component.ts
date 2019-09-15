import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CarrinhoCompraService } from 'src/app/providers/services/carrinho-compra.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  totalItensCarrinho$: Observable<any>;
  lastId = localStorage.getItem('id-ultimo-pedido');
  constructor(private menuCtrl: MenuController, private carrinhoCompra: CarrinhoCompraService) { }

  ngOnInit() {
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

  openSideMenu() {
    this.menuCtrl.open();
  }

}
