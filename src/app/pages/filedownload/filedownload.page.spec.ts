import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledownloadPage } from './filedownload.page';

describe('FiledownloadPage', () => {
  let component: FiledownloadPage;
  let fixture: ComponentFixture<FiledownloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiledownloadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledownloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
