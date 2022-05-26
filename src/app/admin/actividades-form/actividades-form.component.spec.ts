import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesFormComponent } from './actividades-form.component';

describe('ActividadesFormComponent', () => {
  let component: ActividadesFormComponent;
  let fixture: ComponentFixture<ActividadesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
