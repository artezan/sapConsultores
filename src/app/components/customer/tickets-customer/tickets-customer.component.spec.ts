import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsCustomerComponent } from './tickets-customer.component';

describe('TicketsCustomerComponent', () => {
  let component: TicketsCustomerComponent;
  let fixture: ComponentFixture<TicketsCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
