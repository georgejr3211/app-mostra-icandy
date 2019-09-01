import { StatusService } from './../../providers/services/status.service';
import { AuthService } from './../../providers/services/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  formCRUD: FormGroup;
  auth$: Observable<any>;
  registros$: Observable<any>;
  
  constructor(private authService : AuthService, private statusService: StatusService) {
    this.formCRUD = new FormGroup({
      id: new FormControl(null, Validators.required),
      descricao: new FormControl(null, Validators.required),
      ativo: new FormControl(null, Validators.required)
    }, {updateOn: 'change'})
   }

   ngOnInit() {
     this.statusService.index();
    this.auth$ = this.authService.auth('georgefeitosajr12@gmail.com', 'georgejr');
    this.registros$.subscribe((data) => {
      console.log('registro', data);
    })
  }

  ngAfterViewInit(){

  }

}
