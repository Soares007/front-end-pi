import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) {
      return 'N/A';
    }

    const formattedDate = typeof value === 'string' ? new Date(value) : value;
    return formatDate(formattedDate, 'dd/MM/yyyy', 'en-US');
  }
}
