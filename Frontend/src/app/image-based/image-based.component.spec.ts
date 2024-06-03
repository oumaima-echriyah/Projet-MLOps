import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBasedComponent } from './image-based.component';

describe('ImageBasedComponent', () => {
  let component: ImageBasedComponent;
  let fixture: ComponentFixture<ImageBasedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageBasedComponent]
    });
    fixture = TestBed.createComponent(ImageBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
