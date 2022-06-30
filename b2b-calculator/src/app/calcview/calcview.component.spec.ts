import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcviewComponent } from './calcview.component';

describe('CalcviewComponent', () => {
  let component: CalcviewComponent;
  let fixture: ComponentFixture<CalcviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
