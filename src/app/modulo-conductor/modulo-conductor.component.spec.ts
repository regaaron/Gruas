import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloConductorComponent } from './modulo-conductor.component';

describe('ModuloConductorComponent', () => {
  let component: ModuloConductorComponent;
  let fixture: ComponentFixture<ModuloConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloConductorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
