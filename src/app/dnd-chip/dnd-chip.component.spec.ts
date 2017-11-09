import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DndChipComponent } from './dnd-chip.component';

describe('DndChipComponent', () => {
  let component: DndChipComponent;
  let fixture: ComponentFixture<DndChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DndChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DndChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
