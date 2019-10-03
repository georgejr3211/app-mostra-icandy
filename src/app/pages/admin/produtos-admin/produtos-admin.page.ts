import { Observable } from "rxjs/internal/Observable";
import { AlertController } from "@ionic/angular";
import { CategoriasService } from "./../../../providers/services/categorias.service";
import { ProdutosService } from "./../../../providers/services/produtos.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-produtos-admin",
  templateUrl: "./produtos-admin.page.html",
  styleUrls: ["./produtos-admin.page.scss"]
})
export class ProdutosAdminPage implements OnInit {
  retornoInsert$: Observable<any>;
  retornoUpdate$: Observable<any>;

  categoria$: Observable<any>;
  categorias$: Observable<any>;
  formCRUD: FormGroup;
  formCRUDCategoria: FormGroup;

  options = [{ id: 0, descricao: "Inserir" }, { id: 1, descricao: "Editar" }];

  constructor(
    private router: Router,
    private categoriasService: CategoriasService,
    private produtosService: ProdutosService,
    private alertController: AlertController
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
      console.log("data", data);
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {}

  buscarId(id) {
    this.categoria$ = this.categoriasService.find(id);
    this.categoria$.subscribe(data => {
      if (data) {
        this.formCRUDCategoria.patchValue(data);
      } else {
        //apresentar alert
      }
    });
  }

  onConfirm() {
    if (this.formCRUDCategoria.get("OPTION").value) {
      this.retornoUpdate$ = this.categoriasService.update(
        this.formCRUDCategoria.value
      );
      this.retornoUpdate$.subscribe(data => {
        if (data) {
          console.log("UPDATE", data);
        } else {
          this.presentAlert();
        }
      });
    } else {
      this.retornoInsert$ = this.categoriasService.update(
        this.formCRUDCategoria.value
      );
      this.retornoInsert$.subscribe(data => {
        if (data) {
          console.log("INSERT", data);
        } else {
          this.presentAlert();
        }
      });
    }
  }

  updateAtivoCategoria(data?) {
    let checked;
    if (data) {
      checked = 1;
    } else {
      checked = 0;
    }
    this.formCRUDCategoria.get("ativo").setValue(checked);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.formCRUDCategoria.get("OPTION").value
        ? "Erro ao atualizar"
        : "Erro ao Inserir",
      message: "Contate os desenvolvedores!!",
      buttons: ["OK"]
    });
    await alert.present();
  }

  dismiss() {
    this.router.navigate(["/main/list"]);
  }
}
