import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic-rating';

import { IonicModule } from '@ionic/angular';

import { AvaliacaoPage } from './avaliacao.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AvaliacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicRatingModule,
    SharedModule
  ],
  declarations: [AvaliacaoPage]
})
export class AvaliacaoPageModule {}
