import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/services/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/providers/services/usuarios.service';
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { EsqueciMinhaSenhaPage } from '../esqueci-minha-senha/esqueci-minha-senha.page';


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
    private router: Router,
    public modalController: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.formCRUD = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    }, { updateOn: 'change' });
  }

  ngOnInit() {
    let authData: any = localStorage.getItem('auth/data');
    if (authData) {
      authData = JSON.parse(authData);
      this.formCRUD.patchValue(authData);
      this.onLogin();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EsqueciMinhaSenhaPage
    });
    return await modal.present();
  }

  async onLogin() {
    const email = this.formCRUD.get('email').value;
    const password = this.formCRUD.get('password').value;
    const loading = await this.loadingCtrl.create({ message: 'Por favor aguarde' });
    loading.present();

    this.authService.auth(email, password).subscribe(async token => {
      if (token.length) {
        localStorage.setItem('auth/token', token);
        localStorage.setItem('auth/data', JSON.stringify({ email, password }));
        this.router.navigate(['/main/home']);
      } else {
        const alert = await this.alertCtrl.create({
          message: 'Falha ao tentar realizar autenticação, informe os dados corretamente', buttons: ['Ok']
        });
        alert.present();
      }

      loading.dismiss();
    }, async err => {
      const alert = await this.alertCtrl.create({ message: err.error, buttons: ['Ok'] });
      alert.present();
      loading.dismiss();
    });

  }

  onCadastro() {
    this.router.navigate(['/cadastro']);
  }

}