import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/providers/services/usuarios.service';
import { Observable } from 'rxjs';
import { ProdutosService } from 'src/app/providers/services/produtos.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CarrinhoCompraService } from 'src/app/providers/services/carrinho-compra.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  images = environment.api + '/assets/images/';
  usuario$: Observable<any>;
  produtos$: Observable<any>;

  produtoCarrinho = [];

  constructor(
    private userService: UsuariosService,
    private produtosService: ProdutosService,
    private carrinhoCompra: CarrinhoCompraService
  ) { }

  ngOnInit() {
    this.usuario$ = this.userService.usuarioLogado();
    this.produtos$ = this.produtosService.index();
  }

  onChangeValor(type, product) {
    switch (type) {
      case 'add':
        this.produtoCarrinho.push(product);
        break;
      case 'remove':
        const index = this.produtoCarrinho.findIndex(item => item.id === product.id);
        this.produtoCarrinho = this.produtoCarrinho.filter((item, indexItem) => index !== indexItem);
        break;
    }

    // this.carrinhoCompra.setCarrinho(this.produtoCarrinho.length);
    this.carrinhoCompra.addProdutoCarrinho(this.produtoCarrinho);
  }

  countQtdItemCarrinho(idProduto) {
    return this.produtoCarrinho.filter(item => item.id === idProduto).length;
  }

  totalProduto(preco, idProduto) {
    const total = this.produtoCarrinho
      .filter(item => item.id === idProduto)
      .map(item => Number(item.preco))
      .reduce((a, b) => a + b, 0).toFixed(2);

    if (Number(total) <= 0) {
      return preco;
    }
    return total;
  }

}
