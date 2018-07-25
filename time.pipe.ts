import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'time'
})
export class TimePipe extends DatePipe implements PipeTransform {
    public transform(value: any, format: string): string {
        const dateTime: Date = new Date(value);

        let dateTimeString: string;
        if (this.isValidDate(dateTime)) {
            dateTimeString = dateTime.toString();
        } else {
            dateTimeString = `1970-01-01 ${value}`;
        }

        // Replace any dashes with slashes, as Safari and IE11 don't
        // recognise dates with dashes in them.
        dateTimeString = dateTimeString.replace(/-/g, '/');

        if (!this.isValidDate(new Date(dateTimeString))) {
            return value;
        }

        const formattedTime: string = super.transform(dateTimeString, format);

        return formattedTime;
    }

    private isValidDate(d: any): boolean {
        return d instanceof Date && !isNaN(d.getTime());
    }
}