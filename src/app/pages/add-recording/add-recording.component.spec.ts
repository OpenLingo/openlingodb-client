import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordingComponent } from './add-recording.component';

describe('AddRecordingComponent', () => {
  let component: AddRecordingComponent;
  let fixture: ComponentFixture<AddRecordingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecordingComponent]
    });
    fixture = TestBed.createComponent(AddRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
