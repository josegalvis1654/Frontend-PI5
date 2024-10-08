import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarProductoComponent } from './guardar-producto.component';

describe('GuardarProductoComponent', () => {
  let component: GuardarProductoComponent;
  let fixture: ComponentFixture<GuardarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
