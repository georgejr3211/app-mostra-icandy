import { AlertController } from '@ionic/angular';
import { ProdutosService } from 'src/app/providers/services/produtos.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
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
      nome: new FormControl(null),
      preco: new FormControl(null),
      foto_produto: new FormControl(null),
      categorias_id: new FormControl(null),
      restaurantes_id: new FormControl(1),
      ativo: new FormControl(1),
      foto: new FormControl(null),
    }, { updateOn: 'change' });
  }

  ionViewDidEnter() {
    this.categorias$ = this.categoriaService.index();
    console.log('this.navParams.data', this.navParams.data);
    this.formData.patchValue(this.navParams.data);
  }

  ngAfterViewInit() {

  }

  onSave() {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const options: FileUploadOptions = {
      fileKey: this.cameraService.field,
      fileName: `${this.formData.get('nome').value}.jpg`,
      headers: {
        Connection: 'close',
        'x-access-token': localStorage.getItem('auth/token')
      },
      httpMethod: this.cameraService.method,
      params: this.formData.value
    }

    const url = `${this.cameraService.apiURL}${this.cameraService.urlFoto}`;
    fileTransfer.upload(this.formData.get('foto_produto').value, url, options)
      .then(async data => {
        const alert = await this.alertCtrl.create({
          message: 'Produto cadastrado com sucesso'
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

  selectImage() {
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

}
