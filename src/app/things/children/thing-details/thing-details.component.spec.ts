import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingDetailsComponent } from './thing-details.component';

describe('ThingDetailsComponent', () => {
  let component: ThingDetailsComponent;
  let fixture: ComponentFixture<ThingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
