
import moment from "moment";

export class DateUtils {
    static isValidDate(date: string, formatIn?: string): boolean {
        if (!date) return false;
        return moment(date, formatIn || 'YYYYMMDD').isValid();
    }
    static formatDate(date: string, formatIn?: string, formatOut?: string, invalidDateReturn?: string): string {
        if (!this.isValidDate(date, formatIn)) return invalidDateReturn || '';
        return moment(date, formatIn || 'YYYYMMDD').format(formatOut || 'DD/MM/YYYY');
    }
    static getCurrentDateTimeString(): string {
        return moment().format('YYYYMMDDHHmmss');
    }
}