import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageIcoComponent } from './language-ico.component';

describe('LanguageIcoComponent', () => {
  let component: LanguageIcoComponent;
  let fixture: ComponentFixture<LanguageIcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageIcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
