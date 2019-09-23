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
  imageLogo = '/assets/images/confeitaria-logo.png';
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
    console.log(`logando`);
    alert(`logando`);
    const email = this.formCRUD.get('email').value;
    const password = this.formCRUD.get('password').value;
    this.authService.auth(email, password).subscribe(token => {
      if (token.length) {
        localStorage.setItem('auth/token', token);
        this.router.navigate(['/main/home']);
      } else {
        console.log('sem Token');
      }
    });
  }

  onCadastro() {
    this.router.navigate(['/cadastro']);
  }

}
