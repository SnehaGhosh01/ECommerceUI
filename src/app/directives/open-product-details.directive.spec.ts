/*import { OpenProductDetailsDirective } from './open-product-details.directive';

describe('OpenProductDetailsDirective', () => {
  it('should create an instance', () => {
    const directive = new OpenProductDetailsDirective();
    expect(directive).toBeTruthy();
  });
});*/
import { OpenProductDetailsDirective } from './open-product-details.directive';
import { Router } from '@angular/router';

describe('OpenProductDetailsDirective', () => {
  it('should create an instance', () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']); // Create a spy for the Router service
    const directive = new OpenProductDetailsDirective(routerSpy);
    expect(directive).toBeTruthy();
  });
});
