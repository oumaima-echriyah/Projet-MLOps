import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureBasedComponent } from './signature-based.component';

describe('SignatureBasedComponent', () => {
  let component: SignatureBasedComponent;
  let fixture: ComponentFixture<SignatureBasedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignatureBasedComponent]
    });
    fixture = TestBed.createComponent(SignatureBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
