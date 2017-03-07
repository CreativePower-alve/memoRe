import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeItemComponent } from './practice-item.component';

describe('PracticeItemComponent', () => {
  let component: PracticeItemComponent;
  let fixture: ComponentFixture<PracticeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
