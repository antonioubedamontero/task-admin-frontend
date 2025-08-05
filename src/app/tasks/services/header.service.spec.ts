import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HeaderService } from './header.service';
import { Location } from '@angular/common';

describe('HeaderService', () => {
  let service: HeaderService;
  let router: Router;
  let routerSpy: jasmine.Spy;
  let location: Location;
  let locationSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Router, Location],
    });
    service = TestBed.inject(HeaderService);
    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigateByUrl');
    location = TestBed.inject(Location);
    locationSpy = spyOn(location, 'back');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('- title', () => {
    it('should return blank title when title is not set', () => {
      expect(service.title()).toBe('');
    });

    it('should return title when title is set', () => {
      const title = 'mock title';
      service.setTitle(title);
      expect(service.title()).toBe(title);
    });
  });

  describe('- isBackBtnShow', () => {
    it('should return false if isBackBtnShow not set or false', () => {
      expect(service.isBackBtnShow).toBeFalsy();
    });

    it('should return true when isBackBtnShow is true', () => {
      service.showBackBtn = true;
      expect(service.isBackBtnShow).toBeTruthy();
    });
  });

  describe('- navigateBack', () => {
    it('should navigate to tasks route if navigation history is empty', () => {
      service.navigateBack();
      expect(routerSpy).toHaveBeenCalledWith('/tasks');
    });

    it('should navigate back if history routes is not empty', () => {
      spyOnProperty(window.history, 'length').and.returnValue(2);
      service.navigateBack();
      expect(locationSpy).toHaveBeenCalled();
    });
  });
});
