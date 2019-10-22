import { AlertController, LoadingController } from '@ionic/angular';
import { ProdutosService } from 'src/app/providers/services/produtos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CameraService } from 'src/app/providers/services/camera.service';
import { CategoriasService } from 'src/app/providers/services/categorias.service';
import { Observable } from 'rxjs';
import { FileTransferObject, FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit, AfterViewInit {
  images = environment.api + "/assets/images/";

  formData: FormGroup;
  categorias$: Observable<any[]>;
  fotoProduto$: Observable<any>;

  constructor(
    private cameraService: CameraService,
    private produtoService: ProdutosService,
    private categoriaService: CategoriasService,
    private fileTransfer: FileTransfer,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private file: File,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.cameraService.field = 'foto_produto';
    this.cameraService.urlFoto = '/v1/produtos';

  }

  ngOnInit() {
    this.formData = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null, Validators.required),
      preco: new FormControl(null, Validators.required),
      foto_produto: new FormControl(null),
      categorias_id: new FormControl(null, Validators.required),
      restaurantes_id: new FormControl(1),
      ativo: new FormControl(1),
      foto: new FormControl(null),
      qtd_estoque: new FormControl(null, Validators.required)
    }, { updateOn: 'change' });
  }

  ionViewDidEnter() {
    this.categorias$ = this.categoriaService.index();
    this.formData.patchValue(this.navParams.data);
    this.fotoProduto$ = this.cameraService.getCurrentImage();
    this.cameraService.subject.next(null);
  }

  ngAfterViewInit() {

  }

  onSave() {
    let obj = { ...this.formData.value };

    if (this.formData.get('foto_produto').value) {
      this.uploadImage(obj);
    } else if (this.formData.get('id').value) {
      this.produtoService.update(this.formData.value).subscribe(async () => {
        const msg = 'Produto atualizado com sucesso';
        const alert = await this.alertCtrl.create({
          message: msg
        });

        alert.present();

      });
    }
  }

  selectImage() {

    this.cameraService.selectImage();
    this.cameraService.getCurrentImage().subscribe(data => {
      if (!data) { return; }
      this.formData.get('foto_produto').setValue(data);
    })
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async uploadImage(obj) {
    let url = `${this.cameraService.apiURL}${this.cameraService.urlFoto}`;
    if (this.formData.get('id').value) {
      url += `/${this.formData.get('id').value}`;
      this.cameraService.method = 'PUT';
    } else {
      this.cameraService.method = 'POST';
      delete obj.id;
    }

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const options: FileUploadOptions = {
      fileKey: this.cameraService.field,
      fileName: `${this.formData.get('nome').value}.png`,
      headers: {
        Connection: 'close',
        'x-access-token': localStorage.getItem('auth/token')
      },
      httpMethod: this.cameraService.method,
      params: obj
    }

    const loading = await this.loadingCtrl.create({
      message: 'Por favor aguarde...',
    })
    loading.present();
    fileTransfer.upload(this.formData.get('foto_produto').value, url, options)
      .then(async data => {
        const msg = this.cameraService.method === 'POST' ? 'Produto cadastrado com sucesso' : 'Produto atualizado com sucesso';
        const alert = await this.alertCtrl.create({
          message: msg,
          buttons: ['OK']
        });

        loading.dismiss();
        alert.present();
        this.modalCtrl.dismiss();
      })
      .catch(async error => {
        const alert = await this.alertCtrl.create({
          message: 'Houve um erro ao tentar cadastrar o produto, consulte o log da API'
        });
        alert.present();
        loading.dismiss();
      });

  }

}
