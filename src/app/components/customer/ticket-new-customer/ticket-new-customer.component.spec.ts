import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketNewCustomerComponent } from './ticket-new-customer.component';

describe('TicketNewCustomerComponent', () => {
  let component: TicketNewCustomerComponent;
  let fixture: ComponentFixture<TicketNewCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketNewCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketNewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
