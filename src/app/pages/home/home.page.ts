import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/providers/services/usuarios.service';
import { Observable } from 'rxjs';
import { ProdutosService } from 'src/app/providers/services/produtos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  cardItem = [
    {
      id: 1,
      title: 'Brigadeiro',
      peso: '500g',
      foto_url: 'assets/images/brigadeiro.png',
      restaurante: 'ArtesNeW',
      preco_produto: 2.75
    },
    {
      id: 2,
      title: 'Cupcacke',
      peso: '200g',
      foto_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0aniHScExMOoE0v8O6gwUIseQKA7bpU4scoro5UqLzDBITxgew',
      restaurante: 'ArtesNeW',
      preco_produto: 4.25
    },
    {
      id: 3,
      title: 'Donuts',
      peso: '500g',
      foto_url: 'assets/images/donuts.png',
      restaurante: 'ArtesNeW',
      preco_produto: 3.52
    }
  ]

  usuario$: Observable<any>;
  produtos$: Observable<any>;

  constructor(
    private userService: UsuariosService,
    private produtosService: ProdutosService
  ) { }

  ngOnInit() {
    this.usuario$ = this.userService.usuarioLogado();
    this.produtos$ = this.produtosService.index();
    this.produtos$.subscribe(data => console.log('data', data));
  }

}
