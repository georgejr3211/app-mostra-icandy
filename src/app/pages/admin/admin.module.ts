import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPage } from './admin.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrMaskerModule } from 'br-mask';

const routes: Routes = [
  {
    path: ':id',
    component: AdminPage
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
  declarations: [AdminPage]
})
export class AdminPageModule {}
