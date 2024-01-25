import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSetOfFlashcardsComponent } from './create-set-of-flashcards.component';

describe('CreateSetOfFlashcardsComponent', () => {
  let component: CreateSetOfFlashcardsComponent;
  let fixture: ComponentFixture<CreateSetOfFlashcardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSetOfFlashcardsComponent]
    });
    fixture = TestBed.createComponent(CreateSetOfFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
