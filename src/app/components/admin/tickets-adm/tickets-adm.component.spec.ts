import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsAdmComponent } from './tickets-adm.component';

describe('TicketsAdmComponent', () => {
  let component: TicketsAdmComponent;
  let fixture: ComponentFixture<TicketsAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
