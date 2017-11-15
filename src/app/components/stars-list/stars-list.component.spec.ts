import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsListComponent } from './stars-list.component';

describe('StarsListComponent', () => {
  let component: StarsListComponent;
  let fixture: ComponentFixture<StarsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
