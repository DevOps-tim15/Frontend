import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NistagramComponent } from './nistagram.component';

describe('NistagramComponent', () => {
  let component: NistagramComponent;
  let fixture: ComponentFixture<NistagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NistagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NistagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
