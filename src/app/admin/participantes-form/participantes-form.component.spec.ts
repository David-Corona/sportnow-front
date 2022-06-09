import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantesFormComponent } from './participantes-form.component';

describe('ParticipantesFormComponent', () => {
  let component: ParticipantesFormComponent;
  let fixture: ComponentFixture<ParticipantesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
