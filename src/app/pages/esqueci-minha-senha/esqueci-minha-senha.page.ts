import { UsuariosService } from 'src/app/providers/services/usuarios.service';
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../providers/services/auth.service";
import { AlertController } from "@ionic/angular";
import { Observable } from "rxjs";

@Component({
  selector: "app-esqueci-minha-senha",
  templateUrl: "./esqueci-minha-senha.page.html",
  styleUrls: ["./esqueci-minha-senha.page.scss"]
})
export class EsqueciMinhaSenhaPage {
  formCRUD: FormGroup;
  retorno$: Observable<any>;

  constructor(
    private facadeUsuarios: UsuariosService,
    private modalCtrl: ModalController,
    private authService: AuthService,
    public alertController: AlertController
  ) {
    this.formCRUD = new FormGroup(
      {
        email: new FormControl(null, Validators.required)
      },
      { updateOn: "change" }
    );
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  recuperarSenha() {
    this.retorno$ = this.facadeUsuarios.findEmail(this.formCRUD.value.email);
    this.retorno$.subscribe(data => {
      if (data.value) {
        this.authService.forgotPassword(this.formCRUD.value.email).subscribe();
        this.presentAlertSuccess();
      }
      else {
        this.presentAlertFailure();
      }
    })  
  }

  async presentAlertSuccess() {
    const alert = await this.alertController.create({
      header: "Verifique seu e-mail",
      // subHeader: "Verifique seu e-mail",
      message: "Enviado com sucesso!!",
      buttons: ["OK"]
    });

    await alert.present();
  }

  async presentAlertFailure() {
    const alert = await this.alertController.create({
      header: "E-mail não encontrado",
      // subHeader: "Verifique seu e-mail",
      message: "Tente novamente!!",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
