import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesFormComponent } from './mensajes-form.component';

describe('MensajesFormComponent', () => {
  let component: MensajesFormComponent;
  let fixture: ComponentFixture<MensajesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
