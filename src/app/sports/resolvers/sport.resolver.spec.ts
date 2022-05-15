import { TestBed } from '@angular/core/testing';

import { SportResolver } from './sport.resolver';

describe('SportResolver', () => {
  let resolver: SportResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SportResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
