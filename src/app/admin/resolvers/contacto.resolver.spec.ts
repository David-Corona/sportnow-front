import { TestBed } from '@angular/core/testing';

import { ContactoResolver } from './contacto.resolver';

describe('ContactoResolver', () => {
  let resolver: ContactoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ContactoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
