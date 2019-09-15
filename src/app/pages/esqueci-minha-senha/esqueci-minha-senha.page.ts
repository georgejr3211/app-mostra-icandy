import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../providers/services/auth.service';

@Component({
  selector: 'app-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.page.html',
  styleUrls: ['./esqueci-minha-senha.page.scss'],
})
export class EsqueciMinhaSenhaPage {

  formCRUD: FormGroup;

  constructor(private modalCtrl: ModalController, private authService: AuthService) {
    this.formCRUD = new FormGroup({
      email: new FormControl(null, Validators.required),
    }, { updateOn: 'change' });
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }

  recuperarSenha() {
    this.authService.forgotPassword(this.formCRUD.value.email).subscribe(data => console.log(data));
  }

}
