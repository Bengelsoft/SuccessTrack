import {Injectable} from '@angular/core';
import {enUS, fr, nl} from "date-fns/locale";
import {format} from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class TimeFormatService {


  /**
   * Format the `date` parameter using the `formatStyle` and `locale`.
   *
   * check the value of the `locale` parameter. If `locale` is "en", `currentlocale` is set to `enUS` (English - United States).
   * If `locale` is "fr", `currentlocale` is set to `fr` (French).
   * If `locale` is anything else, `currentlocale` is set `nl` (Dutch).
   * If this operation fails (throws an error), it catches the error and simply returns the original `date` object.
   *
   * returns the result of calling the `format` function with `date`, `formatStyle`, and an object with a `locale` property set to `currentlocale`.
   * The `format` function is formatting function from library date-fns, which formats the date according to the specified format and locale.
   *
   * @param locale
   * @param formatStyle
   * @param date
   */
  formatDate(locale: string, formatStyle: string, date: Date): string {
    let currentlocale: Locale = nl;
    switch (locale) {

      case "en" : {
        currentlocale = enUS;
        break;
      }
      case "fr" : {
        currentlocale = fr;
        break;
      }
      default: {
        currentlocale = nl;
        break;
      }
    }
    return format(date, formatStyle, {locale: currentlocale});
  }
}
