import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage implements OnInit {
  
  formCRUD: FormGroup;

  constructor() { 
    this.formCRUD = new FormGroup({
      rate: new FormControl(2, Validators.required)
    }, { updateOn: 'change'} );
   }

  ngOnInit() {
  }

}
