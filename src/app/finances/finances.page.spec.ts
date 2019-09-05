import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesPage } from './finances.page';

describe('FinancesPage', () => {
  let component: FinancesPage;
  let fixture: ComponentFixture<FinancesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
