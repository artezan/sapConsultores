import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketNewAdmComponent } from './ticket-new-adm.component';

describe('TicketNewAdmComponent', () => {
  let component: TicketNewAdmComponent;
  let fixture: ComponentFixture<TicketNewAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketNewAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketNewAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
