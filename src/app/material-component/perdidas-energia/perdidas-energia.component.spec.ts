import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerdidasEnergiaComponent } from './perdidas-energia.component';

describe('PerdidasEnergiaComponent', () => {
  let component: PerdidasEnergiaComponent;
  let fixture: ComponentFixture<PerdidasEnergiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerdidasEnergiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerdidasEnergiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
