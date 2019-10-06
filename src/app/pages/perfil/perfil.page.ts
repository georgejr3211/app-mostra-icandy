import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsuariosService } from "./../../providers/services/usuarios.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Router } from '@angular/router';
import { CameraService } from 'src/app/providers/services/camera.service';
import { environment } from 'src/environments/environment';

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
  currentImage$: Observable<any>;
  pathImg = environment.api + '/assets/images/';
  telefone;
  valorTelefone;

  isLoading = false;

  constructor(
    private facade: UsuariosService,
    private router: Router,
    private camera: CameraService
  ) {

    this.formCRUD = new FormGroup(
      {
        id: new FormControl(null, {}),
        nome: new FormControl(null, {}),
        sobrenome: new FormControl(null, {}),
        username: new FormControl(null, {}),
        foto: new FormControl(null, {}),
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

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.usuario$ = this.facade.usuarioLogado();
    this.usuario$.subscribe(data => {
      if (data) {
        this.hasData = true;
        this.camera.subject.next(data.foto);
        this.currentImage$ = this.camera.getCurrentImage();
        this.formCRUD.patchValue(data);
        this.formCRUD.get("password").setValue(null);
      }
    });
  }

  ngAfterViewInit() {
    this.formCRUD.disable();
  }

  onEdit(data?) {
    this.formCRUD.get('id').enable();

    if (data) {
      this.valorTelefone = this.formCRUD.get('telefone').value;
      this.formCRUD.get('telefone').setValue('');
      this.formCRUD.get("password").enable();
      this.formCRUD.get("telefone").enable();
      return (this.canEdit = true);
    } else {
      this.formatTelefone();
      this.facade.update(this.formCRUD.value).subscribe();
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

  async selectImage() {
    this.camera.idUsuario = this.formCRUD.get('id').value;
    this.camera.nomeUsuario = this.formCRUD.get('nome').value;
    this.camera.selectImage().then(data => {
      this.currentImage$ = this.camera.getCurrentImage();
    });
  }

  cancelar() {
    this.formCRUD.get('telefone').setValue(this.valorTelefone);
    this.canEdit = false;
    this.formCRUD.disable();
  }

  doLogout() {
    localStorage.removeItem('auth/token');
    localStorage.removeItem('auth/data');
    this.router.navigate(['/login']);
  }
}
