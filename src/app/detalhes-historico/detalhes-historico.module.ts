import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesHistoricoPage } from './detalhes-historico.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesHistoricoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalhesHistoricoPage]
})
export class DetalhesHistoricoPageModule {}
