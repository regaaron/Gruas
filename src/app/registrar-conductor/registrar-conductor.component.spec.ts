import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarConductorComponent } from './registrar-conductor.component';

describe('RegistrarConductorComponent', () => {
  let component: RegistrarConductorComponent;
  let fixture: ComponentFixture<RegistrarConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarConductorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
