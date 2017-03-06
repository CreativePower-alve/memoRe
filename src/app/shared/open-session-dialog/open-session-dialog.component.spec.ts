import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSessionDialogComponent } from './open-session-dialog.component';

describe('OpenSessionDialogComponent', () => {
  let component: OpenSessionDialogComponent;
  let fixture: ComponentFixture<OpenSessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
