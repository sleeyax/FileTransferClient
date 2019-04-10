import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileinfoPage } from './fileinfo.page';

describe('FileinfoPage', () => {
  let component: FileinfoPage;
  let fixture: ComponentFixture<FileinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
