import { ProdutosService } from "./../../../providers/services/produtos.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CategoriasService } from "src/app/providers/services/categorias.service";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: "app-produtos-admin",
  templateUrl: "./produtos-admin.page.html",
  styleUrls: ["./produtos-admin.page.scss"]
})
export class ProdutosAdminPage implements OnInit {

  categorias$: Observable<any>;
  formCRUD: FormGroup;
  formCRUDCategoria: FormGroup;

  options = [
    {id: 0, descricao: 'Inserir'},
    {id: 1, descricao: 'Editar'},
  ]

  constructor(
    private router: Router,
    private categoriasService: CategoriasService,
    private produtosService: ProdutosService
  ) {
    this.formCRUDCategoria = new FormGroup(
      {
        id: new FormControl(null),
        nome: new FormControl(null),
        ativo: new FormControl(1),
        OPTION: new FormControl(0)
      },
      { updateOn: "change" }
    );

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

    this.categorias$ = this.categoriasService.index();
    this.categorias$.subscribe(data => {
      console.log('data', data);
    })

  }

  ngOnInit() {}

  onInserirCategoria() {
  }

  onEditarCategoria() {
  }

  dismiss() {
    this.router.navigate(['/main/list']);
  }
}
