import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryContentComponent } from './category-content.component';

describe('CategoryContentComponent', () => {
  let component: CategoryContentComponent;
  let fixture: ComponentFixture<CategoryContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryContentComponent]
    });
    fixture = TestBed.createComponent(CategoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
