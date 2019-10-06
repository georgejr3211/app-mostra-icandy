import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalEntregaPage } from './local-entrega.page';

describe('LocalEntregaPage', () => {
  let component: LocalEntregaPage;
  let fixture: ComponentFixture<LocalEntregaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalEntregaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalEntregaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
