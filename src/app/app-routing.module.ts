import { CarrinhoPageModule } from './pages/carrinho/carrinho.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'carrinho', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule'},
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminPageModule' },
  { path: 'list', loadChildren: './pages/admin/list/list.module#ListPageModule' },
  { path: 'carrinho', loadChildren: './pages/carrinho/CarrinhoPageModule#CarrinhoPageModule' },
  { path: 'produtos-admin', loadChildren: './pages/admin/produtos-admin/produtos-admin.module#ProdutosAdminPageModule' },
];

@NgModule({
  imports: [
    CarrinhoPageModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
