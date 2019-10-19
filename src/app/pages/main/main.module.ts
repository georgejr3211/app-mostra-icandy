import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/providers/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: MainPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      { path: 'carrinho', canActivate: [AuthGuard], loadChildren: '../carrinho/carrinho.module#CarrinhoPageModule' },
      { path: 'avaliacao', canActivate: [AuthGuard], loadChildren: '../avaliacao/avaliacao.module#AvaliacaoPageModule' },
      { path: 'status', canActivate: [AuthGuard], loadChildren: '../status/status.module#StatusPageModule' },
      { path: 'historico', canActivate: [AuthGuard], loadChildren: '../historico/historico.module#HistoricoPageModule' },
      { path: 'perfil', canActivate: [AuthGuard], loadChildren: '../perfil/perfil.module#PerfilPageModule' },
      { path: 'admin', canActivate: [AuthGuard], loadChildren: '../admin/admin.module#AdminPageModule' },
      { path: 'list', canActivate: [AuthGuard], loadChildren: '../admin/list/list.module#ListPageModule' },
      { path: 'local-entrega', canActivate: [AuthGuard], loadChildren: '../local-entrega/local-entrega.module#LocalEntregaPageModule' },
      { path: 'localizacao-usuario', canActivate: [AuthGuard], loadChildren: '../admin/localizacao-usuario/localizacao-usuario.module#LocalizacaoUsuarioPageModule' },
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
