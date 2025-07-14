import { Injectable } from '@angular/core';

import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class FormatDateService {
  getDateFromDate(date?: string): string {
    if (!date) return 'N/A';
    return moment(date).format('DD-MM-YYYY');
  }

  getTimeFromDate(date?: string): string {
    if (!date) return 'N/A';
    return moment(date).format('HH:mm');
  }

  getDateFromDateTime(date: string, time: string): string {
    if (!date || !time) return '';
    const dateTime = `${date}T${time}`;
    return moment(dateTime, 'DD-MM-YYYY HH:mm').toISOString();
  }

  getFormattedDate(date?: string): string {
    if (!date) return 'N/A';
    return moment(date).format('DD-MM-YYYY HH:mm');
  }
}
