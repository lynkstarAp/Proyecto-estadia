import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasDetallesComponent } from './areas-detalles.component';

describe('AreasDetallesComponent', () => {
  let component: AreasDetallesComponent;
  let fixture: ComponentFixture<AreasDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
