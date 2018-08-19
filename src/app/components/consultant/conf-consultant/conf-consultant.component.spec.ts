import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfConsultantComponent } from './conf-consultant.component';

describe('ConfConsultantComponent', () => {
  let component: ConfConsultantComponent;
  let fixture: ComponentFixture<ConfConsultantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
