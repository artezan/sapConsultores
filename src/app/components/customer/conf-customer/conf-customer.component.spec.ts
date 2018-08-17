import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCustomerComponent } from './conf-customer.component';

describe('ConfCustomerComponent', () => {
  let component: ConfCustomerComponent;
  let fixture: ComponentFixture<ConfCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
