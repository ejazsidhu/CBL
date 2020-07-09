import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiserRosterComponent } from './merchandiser-roster.component';

describe('MerchandiserRosterComponent', () => {
  let component: MerchandiserRosterComponent;
  let fixture: ComponentFixture<MerchandiserRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiserRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiserRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
