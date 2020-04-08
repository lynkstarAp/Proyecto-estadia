import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceConsumosComponent } from './balance-consumos.component';

describe('BalanceConsumosComponent', () => {
  let component: BalanceConsumosComponent;
  let fixture: ComponentFixture<BalanceConsumosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceConsumosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceConsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
