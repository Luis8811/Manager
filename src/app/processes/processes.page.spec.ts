import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessesPage } from './processes.page';

describe('ProcessesPage', () => {
  let component: ProcessesPage;
  let fixture: ComponentFixture<ProcessesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
