import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncripTestComponent } from './encrip-test.component';

describe('EncripTestComponent', () => {
  let component: EncripTestComponent;
  let fixture: ComponentFixture<EncripTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncripTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncripTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
