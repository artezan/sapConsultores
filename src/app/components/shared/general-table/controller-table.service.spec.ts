import { TestBed, inject } from '@angular/core/testing';

import { ControllerTableService } from './controller-table.service';

describe('ControllerTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControllerTableService]
    });
  });

  it('should be created', inject([ControllerTableService], (service: ControllerTableService) => {
    expect(service).toBeTruthy();
  }));
});
