import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
})
export class StatusPage implements OnInit {

  estrelas = [0, 0, 0, 0, 0];
  
  constructor() { }

  ngOnInit() {
  }

}
