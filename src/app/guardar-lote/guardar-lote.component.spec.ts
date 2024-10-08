import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarLoteComponent } from './guardar-lote.component';

describe('GuardarLoteComponent', () => {
  let component: GuardarLoteComponent;
  let fixture: ComponentFixture<GuardarLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarLoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
