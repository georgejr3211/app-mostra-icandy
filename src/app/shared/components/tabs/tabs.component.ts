import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CarrinhoCompraService } from 'src/app/providers/services/carrinho-compra.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  totalItensCarrinho$: Observable<any>;
  constructor(private menuCtrl: MenuController, private carrinhoCompra: CarrinhoCompraService) { }

  ngOnInit() {
    this.totalItensCarrinho$ = this.carrinhoCompra.getProdutosCarrinho();
  }

  openSideMenu() {
    this.menuCtrl.open();
  }

}
