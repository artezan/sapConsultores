import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsConsultantComponent } from './tickets-consultant.component';

describe('TicketsConsultantComponent', () => {
  let component: TicketsConsultantComponent;
  let fixture: ComponentFixture<TicketsConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
