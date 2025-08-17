import { TestBed } from '@angular/core/testing';

import moment from 'moment';

import { FormatDateService } from './format-date.service';

describe('FormatDateService', () => {
  let service: FormatDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('- when call to getDate', () => {
    it('should return null when no date is filled', () => {
      const date = null;
      expect(service.getDate(date!, true)).toBe(null);
    });

    it('should get date formatted when locale date is formed', () => {
      const momentDate = moment(new Date());
      const localeDate = momentDate.toLocaleString();
      const returnedDate = service.getDate(localeDate, true);
      expect(returnedDate).toEqual(momentDate.format('YYYY-MM-DD'));
    });

    it('should get local date formatted from utc date', () => {
      const momentDate = moment(new Date());
      const utcDate = momentDate.toISOString();
      const returnedDate = service.getDate(utcDate, false);
      const expectedDate = moment.utc(utcDate).local().format('YYYY-MM-DD');

      expect(returnedDate).toEqual(expectedDate);
    });
  });

  describe('- when call to getTime', () => {
    it('should get null when no date is filled', () => {
      const date = null;
      expect(service.getTime(date!, true)).toBe(null);
    });

    it('should get time from local date', () => {
      const momentDate = moment(new Date());
      const localDate = momentDate.toLocaleString();
      const returnedTime = service.getTime(localDate, true);

      expect(returnedTime).toEqual(momentDate.format('HH:mm:ss'));
    });

    it('should get time from utc date in locale date', () => {
      const momentDate = moment(new Date());
      const utcDate = momentDate.toISOString();
      const returnedTime = service.getTime(utcDate, false);
      const expectedTime = moment.utc(utcDate).local().format('HH:mm:ss');
      expect(returnedTime).toEqual(expectedTime);
    });
  });

  describe('- when call to getIsoStringFromLocalDate', () => {
    const momentDate = moment(new Date());
    const localDate = momentDate.toLocaleString();
    const localDateFormatted = moment(localDate).format('YYYY-MM-DD');
    const localTimeFormatted = moment(localDate).format('HH:mm:ss');

    it('should return null if no date or time filled', () => {
      expect(
        service.getIsoStringFromLocalDate(null!, localTimeFormatted)
      ).toBeNull();
      expect(
        service.getIsoStringFromLocalDate(localDateFormatted, null!)
      ).toBeNull();
    });

    it('should formtat date when date and time is filled', () => {
      const dateTime = `${localDateFormatted}T${localTimeFormatted}`;
      const dateFormatted = moment(
        dateTime,
        'YYYY-MM-DDTHH:mm:ss'
      ).toISOString();
      expect(
        service.getIsoStringFromLocalDate(
          localDateFormatted,
          localTimeFormatted
        )
      ).toBe(dateFormatted);
    });
  });

  describe('- when call to getFormattedDateFromIsoDate', () => {
    it('should return empty string if date is not filled', () => {
      expect(service.getFormattedDateFromIsoDate(null!)).toBe('');
    });

    it('should return formatted date when utc date is filled', () => {
      const utcDate = moment(new Date()).toISOString();
      const expectedFormattedDate = moment(utcDate)
        .local()
        .format('DD/MM/YYYY HH:mm');
      expect(service.getFormattedDateFromIsoDate(utcDate)).toBe(
        expectedFormattedDate
      );
    });
  });

  describe('- When call to getLocalDateFromIsoString', () => {
    const utcDate = moment(new Date()).toISOString();
    const momentUtcDate = moment(utcDate);
    const time = momentUtcDate.format('HH:mm:ss');
    const date = momentUtcDate.format('YYYY-MM-DD');

    it('should return null if no date or time', () => {
      expect(service.getLocalDateFromIsoString(null!, time)).toBeNull();
      expect(service.getLocalDateFromIsoString(date, null!)).toBeNull();
    });

    it('should get localDateFromIsoString', () => {
      expect(service.getLocalDateFromIsoString(date, time)).toBeTruthy();
    });
  });
});
