import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLotesComponent } from './consultar-lotes.component';

describe('ConsultarLotesComponent', () => {
  let component: ConsultarLotesComponent;
  let fixture: ComponentFixture<ConsultarLotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarLotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
