import { AlertController } from '@ionic/angular';
import { ProdutosService } from 'src/app/providers/services/produtos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CameraService } from 'src/app/providers/services/camera.service';
import { CategoriasService } from 'src/app/providers/services/categorias.service';
import { Observable } from 'rxjs';
import { FileTransferObject, FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit, AfterViewInit {
  images = environment.api + "/assets/images/";

  formData: FormGroup;
  categorias$: Observable<any[]>;

  constructor(
    private cameraService: CameraService,
    private produtoService: ProdutosService,
    private categoriaService: CategoriasService,
    private fileTransfer: FileTransfer,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.cameraService.field = 'foto_produto';
    this.cameraService.urlFoto = '/v1/produtos';

  }

  ngOnInit() {
    this.formData = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null, Validators.required),
      preco: new FormControl(null, Validators.required),
      foto_produto: new FormControl(null, Validators.required),
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
    this.cameraService.subject.next(null);

    this.cameraService.selectImage()
      .then(data => {
        this.cameraService.getCurrentImage().subscribe(c => {
          if (!c) { return; }
          this.formData.get('foto_produto').setValue(c);
        });
      });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  uploadImage(obj) {
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
      fileName: `${this.formData.get('nome').value}.jpg`,
      headers: {
        Connection: 'close',
        'x-access-token': localStorage.getItem('auth/token')
      },
      httpMethod: this.cameraService.method,
      params: obj
    }


    fileTransfer.upload(this.formData.get('foto_produto').value, url, options)
      .then(async data => {
        const msg = this.cameraService.method === 'POST' ? 'Produto cadastrado com sucesso' : 'Produto atualizado com sucesso';
        const alert = await this.alertCtrl.create({
          message: msg,
          buttons: ['OK']
        });

        alert.present();
      })
      .catch(async error => {
        const alert = await this.alertCtrl.create({
          message: 'Houve um erro ao tentar cadastrar o produto, consulte o log da API'
        });

        alert.present();
      });

  }

}
