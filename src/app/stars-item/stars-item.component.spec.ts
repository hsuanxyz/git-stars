import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsItemComponent } from './stars-item.component';

describe('StarsItemComponent', () => {
  let component: StarsItemComponent;
  let fixture: ComponentFixture<StarsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
