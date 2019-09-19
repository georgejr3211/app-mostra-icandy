import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoricoPage } from './historico.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetalhesHistoricoPage } from 'src/app/detalhes-historico/detalhes-historico.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [HistoricoPage, DetalhesHistoricoPage],
  entryComponents: [DetalhesHistoricoPage]
})
export class HistoricoPageModule {}
