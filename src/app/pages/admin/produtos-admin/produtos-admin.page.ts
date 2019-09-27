import { ProdutosService } from "./../../../providers/services/produtos.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CategoriasService } from "src/app/providers/services/categorias.service";
import { Observable } from 'rxjs';

@Component({
  selector: "app-produtos-admin",
  templateUrl: "./produtos-admin.page.html",
  styleUrls: ["./produtos-admin.page.scss"]
})
export class ProdutosAdminPage implements OnInit {

  categoria$: Observable<any>;
  formCRUD: FormGroup;

  constructor(
    private facadeProdutos: ProdutosService,
    private facadeCategorias: CategoriasService
  ) {
    this.formCRUD = new FormGroup(
      {
        id: new FormControl(null),
        categorias_id: new FormControl(null),
        restaurantes_id: new FormControl(1),
        nome: new FormControl(null),
        foto: new FormControl(null),
        descricao: new FormControl(null),
        preco: new FormControl(null),
        ativo: new FormControl(null)
      },
      { updateOn: "change" }
    );
  }

  ngOnInit() {}
}
