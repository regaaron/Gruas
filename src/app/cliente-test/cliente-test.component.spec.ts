import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteTestComponent } from './cliente-test.component';

describe('ClienteTestComponent', () => {
  let component: ClienteTestComponent;
  let fixture: ComponentFixture<ClienteTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
