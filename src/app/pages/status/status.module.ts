import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicRatingModule } from 'ionic4-rating';
import { SharedModule } from 'src/app/shared/shared.module';

import { StatusPage } from './status.page';

const routes: Routes = [
  {
    path: ':id',
    component: StatusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    IonicRatingModule,
  ],
  declarations: [StatusPage]
})
export class StatusPageModule {}
