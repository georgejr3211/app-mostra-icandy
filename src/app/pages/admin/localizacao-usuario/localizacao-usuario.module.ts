import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocalizacaoUsuarioPage } from './localizacao-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: LocalizacaoUsuarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LocalizacaoUsuarioPage],
})
export class LocalizacaoUsuarioPageModule {}
