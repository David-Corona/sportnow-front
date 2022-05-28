import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoDetailsComponent } from './contacto-details.component';

describe('ContactoDetailsComponent', () => {
  let component: ContactoDetailsComponent;
  let fixture: ComponentFixture<ContactoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
