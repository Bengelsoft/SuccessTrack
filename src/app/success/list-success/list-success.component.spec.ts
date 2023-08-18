import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuccessComponent } from './list-success.component';

describe('ListSuccessComponent', () => {
  let component: ListSuccessComponent;
  let fixture: ComponentFixture<ListSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSuccessComponent]
    });
    fixture = TestBed.createComponent(ListSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
