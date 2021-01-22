import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorProductivityComponent } from './supervisor-productivity.component';

describe('SupervisorProductivityComponent', () => {
  let component: SupervisorProductivityComponent;
  let fixture: ComponentFixture<SupervisorProductivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorProductivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorProductivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
