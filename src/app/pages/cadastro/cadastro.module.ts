import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { CadastroPage } from './cadastro.page';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: CadastroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    BrMaskerModule
  ],
  declarations: [CadastroPage],
  exports: [CadastroPage],
  entryComponents: [CadastroPage]
})
export class CadastroPageModule {}
