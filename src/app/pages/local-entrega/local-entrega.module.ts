import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalEntregaPage } from './local-entrega.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LocalEntregaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Geolocation,
  ],
  declarations: [LocalEntregaPage]
})
export class LocalEntregaPageModule { }
