import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultantAdmComponent } from './list-consultant-adm.component';

describe('ListConsultantAdmComponent', () => {
  let component: ListConsultantAdmComponent;
  let fixture: ComponentFixture<ListConsultantAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConsultantAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsultantAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
