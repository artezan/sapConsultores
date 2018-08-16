import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerAdmComponent } from './new-customer-adm.component';

describe('NewCustomerAdmComponent', () => {
  let component: NewCustomerAdmComponent;
  let fixture: ComponentFixture<NewCustomerAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustomerAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
