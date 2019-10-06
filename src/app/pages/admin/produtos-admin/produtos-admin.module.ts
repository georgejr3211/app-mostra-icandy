import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ProdutosAdminPage } from "./produtos-admin.page";
import { SharedModule } from "src/app/shared/shared.module";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { CameraService } from './../../../providers/services/camera.service';


const routes: Routes = [
  {
    path: "",
    component: ProdutosAdminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProdutosAdminPage],
  providers: [
    Camera,
    File,
    CameraService,
    FileTransfer
  ]
})
export class ProdutosAdminPageModule {}
