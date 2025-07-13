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

  getFormattedDate(date?: string): string {
    if (!date) return 'N/A';
    return moment(date).format('DD-MM-YYYY HH:mm');
  }
}
