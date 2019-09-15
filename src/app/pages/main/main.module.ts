import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      { path: 'carrinho', loadChildren: '../carrinho/carrinho.module#CarrinhoPageModule' },
      { path: 'avaliacao', loadChildren: '../avaliacao/avaliacao.module#AvaliacaoPageModule' },
      { path: 'status', loadChildren: '../status/status.module#StatusPageModule' },
      { path: 'historico', loadChildren: '../historico/historico.module#HistoricoPageModule' },
      { path: 'perfil', loadChildren: '../perfil/perfil.module#PerfilPageModule' },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [MainPage]
})
export class MainPageModule { }
