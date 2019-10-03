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
  retornoInsertCategoria$: Observable<any>;
  retornoUpdateCategoria$: Observable<any>;

  retornoInsertProduto$: Observable<any>;
  retornoUpdateProduto$: Observable<any>;

  categoria$: Observable<any>;
  categorias$: Observable<any>;

  produtos$: Observable<any>;

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
      { updateOn: 'change' }
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
        ativo: new FormControl(1),
        OPTION: new FormControl(0)
      },
      { updateOn: 'change' }
    );

    this.categorias$ = this.categoriasService.index();
    this.categorias$.subscribe(data => {
      console.log('DATA CATEGORIAS$ =>', data);
    });
    this.produtos$ = this.produtosService.index();
    this.produtos$.subscribe(data => {
      console.log('DATA PRODUTOS$ =>', data);
    })
  }

  ngOnInit() {}

  ionViewDidEnter() {}

  buscarId(id) {
    this.categoria$ = this.categoriasService.find(id);
    this.categoria$.subscribe(data => {
      if (data) {
        this.formCRUDCategoria.patchValue(data);
      } else {
        console.log('Não foi possível buscar id');
      }
    });
  }

  onConfirmCategoria() {
    if (this.formCRUDCategoria.get("OPTION").value) {
      this.retornoUpdateCategoria$ = this.categoriasService.update(
        this.formCRUDCategoria.value
      );
      this.retornoUpdateCategoria$.subscribe(data => {
        if (data) {
          console.log("UPDATE", data);
        } else {
          this.presentAlertCategoria();
        }
      });
    } else {
      this.retornoInsertCategoria$ = this.categoriasService.insert(
        this.formCRUDCategoria.value
      );
      this.retornoInsertCategoria$.subscribe(data => {
        if (data) {
          console.log("INSERT", data);
        } else {
          this.presentAlertCategoria();
        }
      });
    }
  }

  onConfirmProduto() {
    if (this.formCRUDCategoria.get("OPTION").value) {
      this.retornoUpdateProduto$ = this.produtosService.update(
        this.formCRUDCategoria.value
      );
      this.retornoUpdateProduto$.subscribe(data => {
        if (data) {
          console.log("UPDATE", data);
        } else {
          this.presentAlertProduto();
        }
      });
    } else {
      this.retornoInsertProduto$ = this.produtosService.insert(
        this.formCRUDCategoria.value
      );
      this.retornoInsertProduto$.subscribe(data => {
        if (data) {
          console.log("INSERT", data);
        } else {
          this.presentAlertProduto();
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

  updateAtivoProduto(data?) {
    let checked;
    if (data) {
      checked = 1;
    } else {
      checked = 0;
    }
    this.formCRUDCategoria.get("ativo").setValue(checked);
  }

  async presentAlertCategoria() {
    const alert = await this.alertController.create({
      header: this.formCRUDCategoria.get("OPTION").value
        ? "Erro ao atualizar"
        : "Erro ao Inserir",
      message: "Contate os desenvolvedores!!",
      buttons: ["OK"]
    });
    await alert.present();
  }

  async presentAlertProduto() {
    const alert = await this.alertController.create({
      header: this.formCRUD.get("OPTION").value
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
