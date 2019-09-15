import { FormGroup, FormControl } from "@angular/forms";
import { UsuariosService } from "./../../providers/services/usuarios.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"]
})
export class PerfilPage implements OnInit, AfterViewInit {
  usuario$: Observable<any>;
  formCRUD: FormGroup;
  hasData = false;
  canEdit = false;
  currentImage = 'assets/images/profile.jpeg';
  constructor(
    private facade: UsuariosService,
    private camera: Camera
  ) {
    this.usuario$ = this.facade.usuarioLogado();

    this.formCRUD = new FormGroup(
      {
        id: new FormControl(null, {}),
        nome: new FormControl(null, {}),
        sobrenome: new FormControl(null, {}),
        username: new FormControl(null, {}),
        password: new FormControl(null, {}),
        cpf: new FormControl(null, {}),
        email: new FormControl(null, {}),
        telefone: new FormControl(null, {}),
        perfis_id: new FormControl(null, {}),
        ativo: new FormControl(null, {})
      },
      { updateOn: "change" }
    );
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }

  ngOnInit() {
    this.usuario$.subscribe(data => {
      if (data) {
        this.hasData = true;
        this.formCRUD.patchValue(data);
        this.formCRUD.get('password').setValue(null);
      }
    });
  }

  ngAfterViewInit() {
    this.formCRUD.disable();
  }

  openGallery() {
    console.log('openGallery');
    // this.imagePicker.getPictures({}).then((results) => {
    //   for (var i = 0; i < results.length; i++) {
    //     console.log('Image URI: ' + results[i]);
    //   }
    // }, (err) => { });
  }

  onEdit(data?) {
    if (data) {
      this.formCRUD.enable();
      return this.canEdit = true;
    } else {
      console.log('FORM CRUD', this.formCRUD.value);
      this.facade.update(this.formCRUD.value).subscribe();
      console.log('atualizou');
      this.formCRUD.disable();
      return this.canEdit = false;
    }
  }
}
