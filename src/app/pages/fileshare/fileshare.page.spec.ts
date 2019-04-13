import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesharePage } from './fileshare.page';

describe('FilesharePage', () => {
  let component: FilesharePage;
  let fixture: ComponentFixture<FilesharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
