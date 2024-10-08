import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProveedorComponent } from './consultar-proveedor.component';

describe('ConsultarProveedorComponent', () => {
  let component: ConsultarProveedorComponent;
  let fixture: ComponentFixture<ConsultarProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarProveedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
