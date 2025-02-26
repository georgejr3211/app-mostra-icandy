import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  apiURL: string = environment.api;
  currentImage;
  nomeUsuario;
  idUsuario;
  subject = new BehaviorSubject<any[]>(null);
  field;
  urlFoto;
  method;

  constructor(
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private transfer: FileTransfer,
    private file: File,
    private facade: UsuariosService,
    private loadingCtrl: LoadingController
  ) { }

  async pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      // allowEdit: true,
    };


    this.camera.getPicture(options).then(
      imageData => {
        this.currentImage = "data:image/png;base64," + imageData;
        this.uploadImage();
      },
      err => {
        console.log("Camera issue:" + err);
      }
    );
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Selecionar imagem",
      buttons: [
        {
          text: "Carregar da galeria",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Usar a camera",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancelar",
          role: "cancel"
        }
      ]
    });
    await actionSheet.present();
  }

  async uploadImage() {
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: this.field,
      fileName: `${this.nomeUsuario}.png`,
      headers: {
        Connection: 'close',
        'x-access-token': localStorage.getItem('auth/token')
      },
      httpMethod: this.method,
    }

    const url = `${this.apiURL}${this.urlFoto}`;
    try {
      if (this.field === 'foto_usuario') {
        const loading = await this.loadingCtrl.create({ message: 'Por favor aguarde...' });

        loading.present();

        fileTransfer.upload(this.currentImage, url, options)
          .then(() => {
            this.facade.usuarioLogado().subscribe((data: any) => {
              // if (!data) { return; }
              loading.dismiss();
              this.subject.next(data.foto);
            });
          });
      } else {
        this.subject.next(this.currentImage);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  getCurrentImage() {
    return this.subject;
  }
}


