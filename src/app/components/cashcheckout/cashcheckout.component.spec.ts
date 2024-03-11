import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashcheckoutComponent } from './cashcheckout.component';

describe('CashcheckoutComponent', () => {
  let component: CashcheckoutComponent;
  let fixture: ComponentFixture<CashcheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashcheckoutComponent]
    });
    fixture = TestBed.createComponent(CashcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
