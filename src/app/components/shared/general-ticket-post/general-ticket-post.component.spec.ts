import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTicketPostComponent } from './general-ticket-post.component';

describe('GeneralTicketPostComponent', () => {
  let component: GeneralTicketPostComponent;
  let fixture: ComponentFixture<GeneralTicketPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTicketPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTicketPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
