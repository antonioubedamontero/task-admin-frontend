import { Injectable } from '@angular/core';

import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class FormatDateService {
  getDateFromIsoString(dateIsoString: string): string | null {
    if (!dateIsoString) return null;

    const momentAsDate = moment(dateIsoString);
    return momentAsDate.format('YYYY-MM-DD');
  }

  getTimeFromIsoString(dateIsoString: string): string | null {
    if (!dateIsoString) return null;

    const momentAsDate = moment(dateIsoString);
    return momentAsDate.format('HH:mm:ss');
  }

  getDateIsoStringFormDateTime(
    dateIsoString: string,
    timeIsoString: string
  ): string | null {
    if (!dateIsoString || !timeIsoString) return null;

    const dateTime = `${dateIsoString}T${timeIsoString}`;
    const momentAsDate = moment(dateTime, 'YYYY-MM-DDTHH:mm:ss');
    return momentAsDate.toISOString();
  }

  getFormattedDateFromIsoDate(dateIsoString?: string): string {
    if (!dateIsoString) return '';
    const momentAsDate = moment(dateIsoString, 'YYYY-MM-DDTHH:mm:ss');
    return momentAsDate.format('DD/MM/YYYY HH:mm:ss');
  }
}
