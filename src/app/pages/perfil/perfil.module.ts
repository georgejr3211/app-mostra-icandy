import { CameraService } from './../../providers/services/camera.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerfilPage } from './perfil.page';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { BrMaskerModule } from 'br-mask';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
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
  declarations: [PerfilPage],
  providers: [
    Camera,
    File,
    CameraService,
    FileTransfer
  ]
})
export class PerfilPageModule { }
