import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private apiURL: string = environment.api;
  currentImage = "assets/images/profile.jpeg";
  nomeUsuario;
  idUsuario;
  subject = new BehaviorSubject<any[]>(null);

  constructor(
    private http: HttpClient,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private transfer: FileTransfer,
    private file: File,
    private facade: UsuariosService,
  ) { }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.currentImage = "data:image/jpeg;base64," + imageData;
        this.uploadImage();
      },
      err => {
        console.log("Camera issue:" + err);
      }
    );
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
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

  uploadImage() {
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'foto_usuario',
      fileName: `${this.nomeUsuario}.jpg`,
      headers: {
        'x-access-token': localStorage.getItem('auth/token')
      },
      httpMethod: 'PUT'
    }

    const url = `${this.apiURL}/v1/usuarios/${this.idUsuario}`;
    try {
      fileTransfer.upload(this.currentImage, url, options).then(() => {
        this.facade.usuarioLogado().subscribe((data: any) => {
          if (data) {
            this.subject.next(data.foto);
          }
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  getCurrentImage() {
    return this.subject;
  }
}


