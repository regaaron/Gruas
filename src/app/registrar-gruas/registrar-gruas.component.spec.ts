import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGruasComponent } from './registrar-gruas.component';

describe('RegistrarGruasComponent', () => {
  let component: RegistrarGruasComponent;
  let fixture: ComponentFixture<RegistrarGruasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarGruasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarGruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
