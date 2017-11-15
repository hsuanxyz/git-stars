import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderNodeComponent } from './folder-node.component';

describe('FolderNodeComponent', () => {
  let component: FolderNodeComponent;
  let fixture: ComponentFixture<FolderNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
