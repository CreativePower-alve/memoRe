import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingsSessionComponent } from './things-session.component';

describe('ThingsSessionComponent', () => {
  let component: ThingsSessionComponent;
  let fixture: ComponentFixture<ThingsSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingsSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingsSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
