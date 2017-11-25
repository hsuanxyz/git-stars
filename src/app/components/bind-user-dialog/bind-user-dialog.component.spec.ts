import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindUserDialogComponent } from './bind-user-dialog.component';

describe('BindUserDialogComponent', () => {
  let component: BindUserDialogComponent;
  let fixture: ComponentFixture<BindUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
