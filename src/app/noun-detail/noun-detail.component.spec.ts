import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NounDetailComponent } from './noun-detail.component';

describe('NounDetailComponent', () => {
  let component: NounDetailComponent;
  let fixture: ComponentFixture<NounDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NounDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NounDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
