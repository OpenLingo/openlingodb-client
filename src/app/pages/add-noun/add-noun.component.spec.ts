import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNounComponent } from './add-noun.component';

describe('AddNounComponent', () => {
  let component: AddNounComponent;
  let fixture: ComponentFixture<AddNounComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNounComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNounComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
