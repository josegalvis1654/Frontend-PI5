import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarProductosExistenciaComponent } from './consultar-productos-existencia.component';

describe('ConsultarProductosExistenciaComponent', () => {
  let component: ConsultarProductosExistenciaComponent;
  let fixture: ComponentFixture<ConsultarProductosExistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarProductosExistenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarProductosExistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
