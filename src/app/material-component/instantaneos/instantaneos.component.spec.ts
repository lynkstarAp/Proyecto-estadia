import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantaneosComponent } from './instantaneos.component';

describe('GraficasComponent', () => {
  let component: InstantaneosComponent;
  let fixture: ComponentFixture<InstantaneosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantaneosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantaneosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
