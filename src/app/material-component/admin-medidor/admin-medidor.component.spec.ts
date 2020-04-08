import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMedidorComponent } from './admin-medidor.component';

describe('AdminMedidorComponent', () => {
  let component: AdminMedidorComponent;
  let fixture: ComponentFixture<AdminMedidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMedidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
