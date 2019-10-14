import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { BrMaskerModule } from 'br-mask';

import { IonicModule } from '@ionic/angular';

import { CarrinhoPage } from './carrinho.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CarrinhoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    BrMaskerModule,
    // LocalEntregaPageModule
  ],
  declarations: [CarrinhoPage],
})
export class CarrinhoPageModule { }
