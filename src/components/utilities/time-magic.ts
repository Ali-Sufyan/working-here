import dayjs from "dayjs";

/**
 *welcome to date magic
 ********************
 * @author derek ogagarue
 *@license MIT license
 @description it is a time function to get time differnce future time and get date mor will be added in due tim
 * @example const date = new NewDate("today");
 *date.timeDifference("today", "2015-03-25");
 */

class NewDate {
  constructor() {}
  /**
   *
   *
   * @param {*} dateTime datetime
   * @returns { hr, min, sec, milliSec, weekDay, monthDay, mnyr, utcMilliSec, utcSec, utcMin, utcHr, utcWeekDay,, utcMonthDay, utcMonth, utcYr }
   */
  getDate(dateTime: Date): gottenI {
    const date = new Date(dateTime);
    const hr = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const milliSec = date.getMilliseconds();
    const wkDy = date.getDay();
    const monthDay = date.getDate();
    const mnt = date.getMonth();
    const yr = date.getFullYear();
    const utcMilliSec = date.getUTCMilliseconds();
    const utcSec = date.getUTCSeconds();
    const utcMin = date.getUTCMinutes();
    const utcHr = date.getUTCHours();
    const utcWeekDay = date.getUTCDay();
    const utcMonthDay = date.getUTCDate();
    const utcMonth = date.getUTCMonth();
    const utcYr = date.getUTCFullYear();
    const monh = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    const month = monh[mnt];
    const week = [
      "monday",
      "tuesday",
      "wednesday",
      "thursdsy",
      "friday",
      "saturday",
      "sunday",
    ];
    const weekDay = week[wkDy];
    const gotten: gottenI = {
      hr,
      min,
      sec,
      milliSec,
      weekDay,
      monthDay,
      month,
      yr,
      utcMilliSec,
      utcSec,
      utcMin,
      utcHr,
      utcWeekDay,
      utcMonthDay,
      utcMonth,
      utcYr,
    };
    return gotten;
  }

  /**
   * The function `setDateChild` takes a future date as a string and returns the date without the last
   * two characters, removing any "U" characters if present.
   * @param {string} futureDate - The `futureDate` parameter is a string representing a date in the
   * future.
   * @returns an integer value representing the future date.
   */
  #setDateChild(futureDate: string) {
    const b = futureDate.split("");
    if (futureDate.includes("U")) {
      b.pop();
    }
    b.pop();
    const f = b.join("");
    const ff = parseInt(f);
    return ff;
  }

  // example is 1h, 2m, 3s, 4D, 5M, 6Y, 7Us, 8Um, 9UD
  setDate(futureDate: string, startTime?: string | undefined) {
    let date;
    if (startTime) {
      date = new Date(startTime);
    } else {
      date = new Date();
    }
    if (futureDate.includes("U")) {
      if (futureDate.endsWith("s")) {
        const da = this.#setDateChild(futureDate);
        date.setUTCSeconds(date.getUTCSeconds() + da);
        return date;
      }

      if (futureDate.endsWith("m")) {
        const da = this.#setDateChild(futureDate);
        date.setUTCMinutes(date.getUTCMinutes() + da);
        return date;
      }

      if (futureDate.endsWith("h")) {
        const da = this.#setDateChild(futureDate);
        date.setUTCHours(date.getUTCHours() + da);
        return date;
      }

      if (futureDate.endsWith("D")) {
        const da = this.#setDateChild(futureDate);
        date.setUTCDate(date.getUTCDate() + da);
        return date;
      }

      if (futureDate.endsWith("M")) {
        const da = this.#setDateChild(futureDate);
        date.setUTCMonth(date.getUTCMonth() + da);
        return date;
      }

      if (futureDate.endsWith("Y")) {
        const da = this.#setDateChild(futureDate);
        date.setUTCFullYear(date.getUTCFullYear() + da);
        return date;
      }
    }
    if (!futureDate.includes("U")) {
      if (futureDate.endsWith("s")) {
        const da = this.#setDateChild(futureDate);
        date.setSeconds(date.getSeconds() + da);
        return date;
      }

      if (futureDate.endsWith("m")) {
        const da = this.#setDateChild(futureDate);
        date.setMinutes(date.getMinutes() + da);
        return date;
      }

      if (futureDate.endsWith("h")) {
        const da = this.#setDateChild(futureDate);
        date.setHours(date.getHours() + da);
        return date;
      }

      if (futureDate.endsWith("D")) {
        const da = this.#setDateChild(futureDate);
        date.setDate(date.getDate() + da);
        return date;
      }

      if (futureDate.endsWith("M")) {
        const da = this.#setDateChild(futureDate);
        date.setMonth(date.getMonth() + da);
        return date;
      }

      if (futureDate.endsWith("Y")) {
        const da = this.#setDateChild(futureDate);
        date.setFullYear(date.getFullYear() + da);
        return date;
      }
    }
  }

  /**
   * time differnce is meant to calculate differnce
   * between two time
   * @param{ timeDiffernce (theFirstDate, TheSecondDate) }
   * @returns{months, weeks, days, hours, minutes, seconds}}}}}}
   * */
  timeDifference(d1: string, d2: string): timeDifferenceI {
    let date = new Date(d1);
    let date2 = new Date(d2);
    if (d1 === "today" || d1 === "now" || d1 === "current") {
      date = new Date();
    }
    if (d2 === "today" || d2 === "now" || d2 === "current") {
      date2 = new Date();
    }

    let diff = date2.getTime() - date.getTime();
    if (diff < 0) {
      diff = Math.abs(diff);
    }
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);
    const allTime: timeDifferenceI = {
      years,
      months,
      weeks,
      days,
      hours,

      minutes,
      seconds,
    };
    return allTime;
  }
}
/**
 *welcome to date magic
 ********************
 * @author derek ogagarue
 *@license MIT license
 @description it is a time function to get time differnce future time and get date mor will be added in due tim
 * @example const date = new NewDate("today");
 *date.timeDifference("today", "2015-03-25");
 */
export const DateMagic = new NewDate();

interface gottenI {
  hr: number;
  min: number;
  sec: number;
  milliSec: number;
  weekDay: string;
  monthDay: number;
  month: string;
  yr: number;
  utcMilliSec: number;
  utcSec: number;
  utcMin: number;
  utcHr: number;
  utcWeekDay: number;
  utcMonthDay: number;
  utcMonth: number;
  utcYr: number;
}

interface timeDifferenceI {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;

  minutes: number;
  seconds: number;
}

export function convertDateFormat(inputDateString: string): string {
  // Convert the input string to a Date object
  const inputDate = new Date(inputDateString);

  // Check if the conversion was successful
  if (isNaN(inputDate.getTime())) {
    return inputDateString;
  }

  // Format the Date object in the desired format
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const outputDateString = inputDate.toLocaleDateString("en-US", options);

  return outputDateString;
}

interface DateTimeObject {
  date: string;
  time: string;
}

export function parseDateTime(
  inputDate?: string | Date | null
): DateTimeObject {
  // Use current date if no input is provided
  const dateToFormat = inputDate ? dayjs(inputDate) : dayjs();

  return {
    date: dateToFormat.format("MMMM D, YYYY"),
    time: `${dateToFormat.format("dddd")} ${dateToFormat.format(
      "h:m"
    )}${dateToFormat.format("a")}`,
  };
}

// Example usage:
