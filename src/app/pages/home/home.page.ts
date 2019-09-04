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
  teste$: Observable<any>;
  produtoCarrinho = [];

  constructor(
    private userService: UsuariosService,
    private produtosService: ProdutosService,
    private carrinhoCompraService: CarrinhoCompraService
  ) { }

  ngOnInit() {
    this.usuario$ = this.userService.usuarioLogado();
    this.produtos$ = this.produtosService.index();
  }

  onChangeValor(tipo, produto) {
    const index = this.produtoCarrinho.findIndex(item => item.id === produto.id);
    let qtd = 0;
    switch (tipo) {
      case 'add':
        if (index > -1) {
          qtd = this.produtoCarrinho[index].qtd + 1;
          this.produtoCarrinho[index] = { ...produto, qtd }
        } else {
          this.produtoCarrinho.push({ ...produto, qtd: 1 });
        }
        break;
      case 'remove':
        qtd = this.produtoCarrinho[index].qtd - 1;
        if (qtd < 0) {
          qtd = 0;
          this.produtoCarrinho = [];
        } else {
          this.produtoCarrinho[index] = { ...produto, qtd };
        }
        break;
    }
    this.carrinhoCompraService.addProdutoCarrinho({ carrinho: this.produtoCarrinho, qtd });
  }

  countQtdItemCarrinho(idProduto) {
    return this.produtoCarrinho.find(item => item.id === idProduto);
  }

  totalProduto(preco, idProduto) {
    let data = this.produtoCarrinho
      .find(item => item.id === idProduto);

    if (!data || data.qtd === 0) {
      return preco;
    }

    return (data.preco * data.qtd).toFixed(2);
  }

}
