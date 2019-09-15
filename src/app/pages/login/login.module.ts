import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { EsqueciMinhaSenhaPage } from '../esqueci-minha-senha/esqueci-minha-senha.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  { path: 'main', loadChildren: '../main/main.module#MainPageModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
    // ReactiveFormsModule
  ],
  declarations: [LoginPage, EsqueciMinhaSenhaPage],
  entryComponents: [EsqueciMinhaSenhaPage],
  exports: [LoginPage]
})
export class LoginPageModule { }
