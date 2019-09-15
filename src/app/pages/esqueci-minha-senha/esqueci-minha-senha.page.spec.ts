import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueciMinhaSenhaPage } from './esqueci-minha-senha.page';

describe('EsqueciMinhaSenhaPage', () => {
  let component: EsqueciMinhaSenhaPage;
  let fixture: ComponentFixture<EsqueciMinhaSenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsqueciMinhaSenhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsqueciMinhaSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
