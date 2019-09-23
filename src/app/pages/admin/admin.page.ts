import { Observable } from "rxjs/internal/Observable";
import { UsuariosService } from "../../providers/services/usuarios.service";
import { ProdutosService } from "./../../providers/services/produtos.service";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AuthService } from "../../providers/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"]
})
export class AdminPage implements OnInit {
  validation_messages = {
    nome: [
      { type: "required", message: "Campo Obrigatório." },
      {
        type: "minlength",
        message: "O nome deve ter pelo menos 3 caracteres."
      },
      { type: "maxlength", message: "O nome deve ter no máximo 70 caracteres." }
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

  hasData;

  editUsuario = false;
  contEditUsuario = 0;

  addUsuario = false;
  contAddUsuario = 0;

  usuarioId = true;
  usuario$: Observable<any>;

  telefone;
  cpf;
  formCRUD: FormGroup;
  formCRUDProdutos: FormGroup;
  retorno$;

  constructor(
    private facade: UsuariosService,
    private facadeProdutos: ProdutosService,
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
            Validators.maxLength(70),
            Validators.required
          ])
        ),
        sobrenome: new FormControl(null),
        username: new FormControl(null),
        password: new FormControl(
          null,
          Validators.compose([Validators.minLength(6), Validators.required])
        ),
        password2: new FormControl(
          null,
          Validators.compose([Validators.minLength(6), Validators.required])
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
        perfis_id: new FormControl(1),
        valor: new FormControl(null)
      },
      { updateOn: "change" }
    );

    this.formCRUDProdutos = new FormGroup(
      {
        categorias_id: new FormControl(null),
        restaurante_id: new FormControl(null),
        nome: new FormControl(
          null,
          Validators.compose([
            Validators.minLength(3),
            Validators.maxLength(70),
            Validators.required
          ])
        ),
        foto: new FormControl(null),
        descricao: new FormControl(null),
        preco: new FormControl(null),
        ativo: new FormControl(null)
      },
      { updateOn: "change" }
    );
  }

  ngOnInit() {}

  onSaveUsuario() {
    if (
      this.formCRUD.get("password").value ===
      this.formCRUD.get("password2").value
    ) {
      this.formatTelefone();
      this.formatCpf();
      this.formCRUD.disable();
      console.log("this.form", this.formCRUD.value);
      this.retorno$ = this.facade.insert(this.formCRUD.value);
      this.retorno$.subscribe(data => {
        if (data) {
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
          this.presentAlertErro();
          this.formCRUD.get("email").enable();
          this.formCRUD.get("cpf").enable();
          this.formCRUD.get("email").setValue("");
          this.formCRUD.get("cpf").setValue("");
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
  async presentAlertErro() {
    const alert = await this.alertController.create({
      header: "Erro",
      // subHeader: "Verifique seu e-mail",
      message: "Email ou CPF inválido ou já existentes!!",
      buttons: ["OK"]
    });
    await alert.present();
  }
  dismiss() {
    this.router.navigate(["/login"]);
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

  editarUsuario(data) {
    if (this.contEditUsuario < 1) {
      this.editUsuario = true;
      this.contEditUsuario++;
    } else {
      this.editUsuario = false;
      this.contEditUsuario--;
    }
  }

  buscarUsuario(id?) {
    console.log('ok', this.formCRUD.get('valor').value);
    this.usuario$ = this.facade.find(this.formCRUD.get('valor').value);
    this.usuario$.subscribe(data => {
      if (data) {
        this.hasData = data;
        console.log("Data", data);
        this.formCRUD.patchValue(data);
      }
    });
    this.usuarioId = true;
  }

  criarUsuario(data) {
    if (this.contAddUsuario < 1) {
      this.addUsuario = true;
      this.contAddUsuario++;
    } else {
      this.addUsuario = false;
      this.contAddUsuario--;
    }
  }
}
