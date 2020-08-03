import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditarComponent } from './admin-editar.component';

describe('AdminEditarComponent', () => {
  let component: AdminEditarComponent;
  let fixture: ComponentFixture<AdminEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
