import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomerAdmComponent } from './list-customer-adm.component';

describe('ListCustomerAdmComponent', () => {
  let component: ListCustomerAdmComponent;
  let fixture: ComponentFixture<ListCustomerAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCustomerAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCustomerAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
