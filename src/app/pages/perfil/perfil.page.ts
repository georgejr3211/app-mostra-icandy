import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuariosService } from "./../../providers/services/usuarios.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";
import { ActionSheetController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"]
})
export class PerfilPage implements OnInit, AfterViewInit {
  validation_messages = {
    telefone: [
      { type: "required", message: "Campo telefone obrigatório." },
      {
        type: "minlength",
        message: "O telefone deve ter pelo menos 10 números."
      }
    ],
    password: [
      { type: "required", message: "Campo senha obrigatório." },
      {
        type: "minlength",
        message: "A senha deve ter pelo menos 6 caracteres."
      }
    ]
  };

  usuario$: Observable<any>;
  formCRUD: FormGroup;
  hasData = false;
  canEdit = false;
  currentImage = "assets/images/profile.jpeg";
  telefone;
  valorTelefone;

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(
    private facade: UsuariosService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private router: Router
  ) {
    this.usuario$ = this.facade.usuarioLogado();

    this.formCRUD = new FormGroup(
      {
        id: new FormControl(null, {}),
        nome: new FormControl(null, {}),
        sobrenome: new FormControl(null, {}),
        username: new FormControl(null, {}),
        password: new FormControl(
          null,
          Validators.compose([Validators.minLength(6), Validators.required])
        ),
        cpf: new FormControl(null, {}),
        email: new FormControl(null, {}),
        telefone: new FormControl(
          null,
          Validators.compose([Validators.minLength(14), Validators.required])
        ),
        perfis_id: new FormControl(null, {}),
        ativo: new FormControl(null, {})
      },
      { updateOn: "change" }
    );
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // };

    this.camera.getPicture(options).then(
      imageData => {
        this.currentImage = "data:image/jpeg;base64," + imageData;
      },
      err => {
        // Handle error
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

  ngOnInit() {
    this.usuario$.subscribe(data => {
      if (data) {
        this.hasData = true;
        console.log('Data', data);
        this.formCRUD.patchValue(data);
        this.formCRUD.get("password").setValue(null);
      }
    });
  }

  ngAfterViewInit() {
    this.formCRUD.disable();
  }

  onEdit(data?) {
    console.log(data);
    this.formCRUD.get('id').enable();

    if (data) {
      this.valorTelefone = this.formCRUD.get('telefone').value;
      this.formCRUD.get('telefone').setValue('');
      this.formCRUD.get("password").enable();
      this.formCRUD.get("telefone").enable();
      return (this.canEdit = true);
    } else {
      this.formatTelefone();
      console.log("FORM CRUD", this.formCRUD.value);
      this.facade.update(this.formCRUD.value).subscribe();
      console.log("atualizou");
      this.formCRUD.disable();
      return (this.canEdit = false);
    }
  }

  formatTelefone() {
    this.telefone = this.formCRUD.get("telefone").value;
    this.telefone = this.telefone.replace(/-/g, "");
    this.telefone = this.telefone.replace(/[{()}]/g, "");
    this.telefone = this.telefone.replace(/ /g, "");
    this.formCRUD.get("telefone").setValue(this.telefone);
  }

  cancelar() {
    this.formCRUD.get('telefone').setValue(this.valorTelefone);
    this.canEdit = false;
    this.formCRUD.disable();
  }

  doLogout() {
    localStorage.removeItem('auth/token');
    this.router.navigate(['/login']);
  }
}
