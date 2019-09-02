import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/providers/services/usuarios.service';
import { Observable } from 'rxjs';
import { ProdutosService } from 'src/app/providers/services/produtos.service';
import { environment } from '../../../environments/environment';

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
    private produtosService: ProdutosService
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
        this.produtoCarrinho = this.produtoCarrinho.filter(item => item.id !== product.id);
        break;
    }
  }

  countQtdItemCarrinho(idProduto) {
    console.log(idProduto);
  }

}
