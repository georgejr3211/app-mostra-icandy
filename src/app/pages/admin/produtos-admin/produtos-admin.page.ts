import { Observable } from "rxjs/internal/Observable";
import { AlertController } from "@ionic/angular";
import { CategoriasService } from "./../../../providers/services/categorias.service";
import { ProdutosService } from "./../../../providers/services/produtos.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { CameraService } from "src/app/providers/services/camera.service";

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

  produto$: Observable<any>;
  produtos$: Observable<any>;

  formCRUD: FormGroup;
  formCRUDCategoria: FormGroup;

  options = [{ id: 0, descricao: "Inserir" }, { id: 1, descricao: "Editar" }];

  currentImage$: Observable<any>;
  pathImg = environment.api + "/assets/images/";

  listarProdutos = false;
  cadastrarProdutos = false;

  constructor(
    private router: Router,
    private categoriasService: CategoriasService,
    private produtosService: ProdutosService,
    private alertController: AlertController,
    private camera: CameraService
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
        ativo: new FormControl(1),
        OPTION: new FormControl(0)
      },
      { updateOn: "change" }
    );
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.categorias$ = this.categoriasService.index();
    this.produtos$ = this.produtosService.index();
  }

  cadastrar(data?) {
    if (data) {
      this.cadastrarProdutos = false;
    } else {
      this.cadastrarProdutos = true;
    }
  }

  listar(data?) {
    if (data) {
      this.listarProdutos = false;
    } else {
      this.listarProdutos = true;
    }
  }

  trocarOperacao(form?) {
    if (form === 1) {
      this.formCRUDCategoria.get("id").setValue(null);
      this.formCRUDCategoria.get("nome").setValue(null);
    } else {
      this.formCRUD.get("id").setValue(null);
      this.formCRUD.get("nome").setValue(null);
      this.formCRUD.get("preco").setValue(null);
      this.formCRUD.get("categorias_id").setValue(null);
    }
  }

  buscarIdCategoria(id) {
    this.categoria$ = this.categoriasService.find(id);
    this.categoria$.subscribe(data => {
      if (data) {
        this.formCRUDCategoria.patchValue(data);
      } else {
        console.log("Não foi possível buscar id da categoria");
      }
    });
  }

  buscarIdProduto(id) {
    this.produto$ = this.produtosService.find(id);
    this.produto$.subscribe(data => {
      if (data) {
        this.formCRUD.patchValue(data);
      } else {
        console.log("Não foi possível buscar id do produto");
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
          this.presentAlertSuccess();
          console.log("UPDATE CATEGORIA", data);
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
          this.presentAlertSuccess();
          console.log("INSERT CATEGORIA", data);
        } else {
          this.presentAlertCategoria();
        }
      });
    }
  }

  onConfirmProduto() {
    console.log("FORMCRUD AOBA => ", this.formCRUD.value);
    if (this.formCRUD.get("OPTION").value) {
      this.retornoUpdateProduto$ = this.produtosService.update(
        this.formCRUD.value
      );
      this.retornoUpdateProduto$.subscribe(data => {
        if (data) {
          this.presentAlertSuccess();
          console.log("UPDATE PRODUTO", data);
        } else {
          this.presentAlertProduto();
        }
      });
    } else {
      this.retornoInsertProduto$ = this.produtosService.insert(
        this.formCRUD.value
      );
      this.retornoInsertProduto$.subscribe(data => {
        if (data) {
          this.presentAlertSuccess();
          console.log("INSERT PRODUTO", data);
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
    this.formCRUD.get("ativo").setValue(checked);
  }

  async presentAlertSuccess() {
    const alert = await this.alertController.create({
      header: "Sucesso",
      message: "Operação realizada com sucesso!!",
      buttons: ["OK"]
    });
    await alert.present();
    this.ionViewDidEnter();
  }

  async presentAlertCategoria() {
    const alert = await this.alertController.create({
      header: "Erro",
      message: this.formCRUDCategoria.get("OPTION").value
        ? "Houve um erro ao atualizar!!"
        : "Houve um erro ao Inserir!!",
      buttons: ["OK"]
    });
    await alert.present();
  }

  async presentAlertProduto() {
    const alert = await this.alertController.create({
      header: "Erro",
      message: this.formCRUD.get("OPTION").value
        ? "Houve um erro ao atualizar!!"
        : "Houve um erro ao Inserir!!",
      buttons: ["OK"]
    });
    await alert.present();
  }

  dismiss() {
    this.router.navigate(["/main/list"]);
  }

  async selectImage() {
    this.camera.idUsuario = this.formCRUD.get("id").value;
    this.camera.nomeUsuario = this.formCRUD.get("nome").value;
    this.camera.selectImage().then(data => {
      this.currentImage$ = this.camera.getCurrentImage();
    });
  }
}
