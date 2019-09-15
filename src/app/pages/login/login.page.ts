import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/services/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/providers/services/usuarios.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EsqueciMinhaSenhaPage } from '../esqueci-minha-senha/esqueci-minha-senha.page';
// import { Crop } from '@ionic-native/crop/ngx';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  auth$: Observable<string>;

  formCRUD: FormGroup;
  fileUrl: any = null;
  respData: any;

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private router: Router,
    public modalController: ModalController,
  ) {
    this.formCRUD = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    }, { updateOn: 'change' });
  }

  ngOnInit() {
    this.auth$ = this.authService.auth('georgefeitosajr12@gmail.com', 'georgejr');
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EsqueciMinhaSenhaPage
    });
    return await modal.present();
  }

  onLogin() {
    const email = this.formCRUD.get('email').value;
    const password = this.formCRUD.get('password').value;
    this.authService.auth(email, password).subscribe(token => {
      if (token) {
        console.log('bateu aqui');
        localStorage.setItem('auth/token', token);
        this.router.navigate(['/main/home']);
      }
    });
  }

  onCadastro() {
    this.router.navigate(['/main/cadastro']);
  }

}
