import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsultantAdmComponent } from './new-consultant-adm.component';

describe('NewConsultantAdmComponent', () => {
  let component: NewConsultantAdmComponent;
  let fixture: ComponentFixture<NewConsultantAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConsultantAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConsultantAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
