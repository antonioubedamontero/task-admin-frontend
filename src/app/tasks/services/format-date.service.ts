import { Injectable } from '@angular/core';

import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class FormatDateService {
  getDate(date: string, isLocalDate: boolean): string | null {
    if (!date) return null;

    if (isLocalDate) {
      return moment(date).format('YYYY-MM-DD');
    }

    const momentAsIsoDate = moment.utc(date);
    return momentAsIsoDate.local().format('YYYY-MM-DD');
  }

  getTime(date: string, isLocalDate: boolean): string | null {
    if (!date) return null;

    if (isLocalDate) {
      return moment(date).format('HH:mm:ss');
    }

    const momentAsIsoDate = moment.utc(date);
    return momentAsIsoDate.local().format('HH:mm:ss');
  }

  getLocalDateFromIsoString(
    dateIsoString: string,
    timeIsoString: string
  ): string | null {
    if (!dateIsoString || !timeIsoString) return null;

    const dateTime = `${dateIsoString}T${timeIsoString}`;
    const momentAsDate = moment(dateTime, 'YYYY-MM-DDTHH:mm:ss');
    return momentAsDate.local().format('DD/MM/YYYY HH:mm');
  }

  getIsoStringFromLocalDate(
    localDate: string,
    localTime: string
  ): string | null {
    if (!localDate || !localTime) return null;
    const dateTime = `${localDate}T${localTime}`;
    return moment(dateTime, 'YYYY-MM-DDTHH:mm:ss').toISOString();
  }

  getFormattedDateFromIsoDate(dateIsoString?: string): string {
    if (!dateIsoString) return '';
    const momentAsDate = moment.utc(dateIsoString);
    return momentAsDate.local().format('DD/MM/YYYY HH:mm');
  }
}
