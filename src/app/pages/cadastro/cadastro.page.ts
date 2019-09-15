import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { UsuariosService } from "src/app/providers/services/usuarios.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.page.html",
  styleUrls: ["./cadastro.page.scss"]
})
export class CadastroPage implements OnInit {
  formCRUD: FormGroup;

  constructor(private facade: UsuariosService) {
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
    if ((this.formCRUD.get('password').value).equals(this.formCRUD.get('password2').value)) {
      console.log('ok');
    }
    console.log('this.form', this.formCRUD.value);
    // this.facade.insert(this.formCRUD.value)
  }
}
