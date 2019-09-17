import { AuthService } from "./../../providers/services/auth.service";
import { FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { UsuariosService } from "src/app/providers/services/usuarios.service";
import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.page.html",
  styleUrls: ["./cadastro.page.scss"]
})
export class CadastroPage implements OnInit {
  validation_messages = {
    nome: [
      { type: "required", message: "Campo Obrigatório." },
      {
        type: "minlength",
        message: "O nome deve ter pelo menos 3 caracteres."
      },
      { type: "maxlength", message: "O nome deve ter no máximo 120 caracteres." }
    ],
    telefone: [
      { type: "required", message: "Campo Obrigatório." },
      {
        type: "minlength",
        message: "O telefone deve ter pelo menos 10 números."
      }
    ],
    cpf: [
      { type: "required", message: "Campo Obrigatório." },
      { type: "pattern", message: "O CPF deve conter apenas números." },
      {
        type: "minlength",
        message: "O CPF deve ter pelo menos 11 números."
      }
    ],
    password: [
      { type: "required", message: "Campo Obrigatório." },
      {
        type: "minlength",
        message: "A senha deve ter pelo menos 6 caracteres."
      }
    ],
    email: [
      { type: "required", message: "Campo Obrigatório." },
      { type: "pattern", message: "Verifique se o e-mail está correto." },
      {
        type: "maxlength",
        message: "O e-mail deve conter no máximo 70 caracteres."
      }
    ]
  };

  telefone;
  cpf;
  formCRUD: FormGroup;

  constructor(
    private facade: UsuariosService,
    public alertController: AlertController,
    private router: Router,
    private authService: AuthService
  ) {
    this.formCRUD = new FormGroup(
      {
        nome: new FormControl(
          null,
          Validators.compose([
            Validators.minLength(3),
            Validators.maxLength(120),
            Validators.required
          ])
        ),
        sobrenome: new FormControl(null),
        username: new FormControl(null),
        password: new FormControl(null, Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])
        ),
        password2: new FormControl(null, Validators.compose([
          Validators.minLength(6),
          Validators.required
        ])
        ),
        cpf: new FormControl(
          null,
          Validators.compose([
            Validators.minLength(14),
            Validators.required,
            Validators.pattern(/(0|[1-9]\d)/)
          ])
        ),
        email: new FormControl(
          null,
          Validators.compose([
            Validators.maxLength(70),
            Validators.pattern(
              "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
            ),
            Validators.required
          ])
        ),
        telefone: new FormControl(
          null,
          Validators.compose([Validators.minLength(14), Validators.required])
        ),
        perfis_id: new FormControl(1)
      },
      { updateOn: "change" }
    );
  }

  ngOnInit() {}

  criarConta() {
    if (
      this.formCRUD.get("password").value ===
      this.formCRUD.get("password2").value
    ) {
      this.formatTelefone();
      this.formatCpf();

      this.formCRUD.get("password2").disable();

      console.log("this.form", this.formCRUD.value);
      this.facade.insert(this.formCRUD.value).subscribe();
      this.authService
        .auth(this.formCRUD.value.email, this.formCRUD.value.password)
        .subscribe(token => {
          this.formCRUD.disable();
          if (token) {
            localStorage.setItem("auth/token", token);
            this.router.navigate(["/main/home"]);
          } else {
            console.log("sem Token");
            return;
          }
        });
    } else {
      console.log("nao");
      this.presentAlert();
      this.formCRUD.get("password").setValue(null);
      this.formCRUD.get("password2").setValue(null);
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
    this.telefone = this.formCRUD.get("telefone").value;
    this.telefone = this.telefone.replace(/-/g, "");
    this.telefone = this.telefone.replace(/[{()}]/g, "");
    this.telefone = this.telefone.replace(/ /g, "");
    this.formCRUD.get("telefone").setValue(this.telefone);
  }

  formatCpf() {
    this.cpf = this.formCRUD.get("cpf").value;
    this.cpf = this.cpf.replace(/-/g, "");
    this.cpf = this.cpf.replace(/[{(.)}]/g, "");
    this.formCRUD.get("cpf").setValue(this.cpf);
  }
}
