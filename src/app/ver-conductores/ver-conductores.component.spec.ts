import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerConductoresComponent } from './ver-conductores.component';

describe('VerConductoresComponent', () => {
  let component: VerConductoresComponent;
  let fixture: ComponentFixture<VerConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerConductoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
