import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGruasComponent } from './ver-gruas.component';

describe('VerGruasComponent', () => {
  let component: VerGruasComponent;
  let fixture: ComponentFixture<VerGruasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerGruasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerGruasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
