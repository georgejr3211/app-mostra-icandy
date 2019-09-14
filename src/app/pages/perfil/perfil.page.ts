import { FormGroup, FormControl } from "@angular/forms";
import { UsuariosService } from "./../../providers/services/usuarios.service";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.page.html",
  styleUrls: ["./perfil.page.scss"]
})
export class PerfilPage implements OnInit, AfterViewInit {
  usuario$: Observable<any>;
  formCRUD: FormGroup;
  hasData = false;
  canEdit = false;

  constructor(private facade: UsuariosService) {
    this.usuario$ = this.facade.usuarioLogado();

    this.formCRUD = new FormGroup(
      {
        id: new FormControl(null, {}),
        nome: new FormControl(null, {}),
        sobrenome: new FormControl(null, {}),
        username: new FormControl(null, {}),
        password: new FormControl(null, {}),
        cpf: new FormControl(null, {}),
        email: new FormControl(null, {}),
        telefone: new FormControl(null, {}),
        perfis_id: new FormControl(null, {}),
        ativo: new FormControl(null, {})
      },
      { updateOn: "change" }
    );
  }

  ngOnInit() {
    this.usuario$.subscribe(data => {
      if (data) {
        this.hasData = true;
        this.formCRUD.patchValue(data);
        this.formCRUD.get('password').setValue(null);
      }
    });
  }

  ngAfterViewInit() {
    this.formCRUD.disable();
  }


  onEdit(data?) {
    if (data){
      this.formCRUD.enable();
      return this.canEdit = true;
    } else {
      console.log('FORM CRUD', this.formCRUD.value);
      this.facade.update(this.formCRUD.value).subscribe();
      console.log('atualizou');
      this.formCRUD.disable();
      return this.canEdit = false;
    }
  }
}
