import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaMedidorComponent } from './grafica-medidor.component';

describe('GraficaMedidorComponent', () => {
  let component: GraficaMedidorComponent;
  let fixture: ComponentFixture<GraficaMedidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaMedidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaMedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
