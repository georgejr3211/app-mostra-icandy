import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { UsuariosService } from "src/app/providers/services/usuarios.service";
import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.page.html",
  styleUrls: ["./cadastro.page.scss"]
})
export class CadastroPage implements OnInit {
  
  telefone;
  cpf;
  formCRUD: FormGroup;

  constructor(private facade: UsuariosService, public alertController: AlertController) {
    this.formCRUD = new FormGroup(
      {
        nome: new FormControl(null, {}),
        sobrenome: new FormControl(null, {}),
        username: new FormControl(null, {}),
        password: new FormControl(null, {}),
        password2: new FormControl(null, {}),
        cpf: new FormControl(null, {}),
        email: new FormControl(null, {}),
        telefone: new FormControl(null, {}),
        perfis_id: new FormControl(1, {}),
      },
      { updateOn: "change" }
    );
  }

  ngOnInit() {}

  criarConta() {
    if ((this.formCRUD.get('password').value) === (this.formCRUD.get('password2').value)) {
      this.formatTelefone();
      this.formatCpf();

      this.formCRUD.get('password2').disable();
      
      console.log('this.form', this.formCRUD.value);
      this.facade.insert(this.formCRUD.value)
      this.formCRUD.disable();
    } else {
      console.log('nao');
      this.presentAlert();
      this.formCRUD.get('password').setValue(null);
      this.formCRUD.get('password2').setValue(null);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Erro",
      // subHeader: "Verifique seu e-mail",
      message: "As senhas devem ser iguais!!",
      buttons: ["OK"]
    });

    await alert.present();
  }
  
  formatTelefone() {
    this.telefone = this.formCRUD.get('telefone').value;
    this.telefone = this.telefone.replace(/-/g, "");
    this.telefone = this.telefone.replace(/[{()}]/g, "");
    this.telefone = this.telefone.replace(/ /g, "");
    this.formCRUD.get('telefone').setValue(this.telefone);
  }
  
  formatCpf() {
    this.cpf = this.formCRUD.get('cpf').value;
    this.cpf = this.cpf.replace(/-/g, "");
    this.cpf = this.cpf.replace(/[{(.)}]/g, "");
    this.formCRUD.get('cpf').setValue(this.cpf);
  }
}
