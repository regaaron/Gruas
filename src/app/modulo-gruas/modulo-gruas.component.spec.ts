import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloGruasComponent } from './modulo-gruas.component';

describe('ModuloGruasComponent', () => {
  let component: ModuloGruasComponent;
  let fixture: ComponentFixture<ModuloGruasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloGruasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloGruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
