# date-and-time

[![Circle CI](https://circleci.com/gh/knowledgecode/date-and-time.svg?style=shield)](https://circleci.com/gh/knowledgecode/date-and-time)  

This library is a minimalist collection of functions for manipulating JS date and time. It's tiny, simple, easy to learn.

## Why

JS modules nowadays are getting more huge and complex, and there are also many dependencies. Trying to keep each module simple and small is meaningful.

## Features

- Minimalist. Approximately 2k. (minified and gzipped)
- Extensible. Plugin system support.
- Multi language support.
- Universal / Isomorphic. Works wherever.
- Older browser support. Even works on IE6. :)

## Install

- via npm:

```shell
npm install date-and-time --save
```

- local:

```html
<script src="/path/to/date-and-time.min.js"></script>
```

## Recent Changes

- 0.13.0
  - The `format()` now supports a compiled formatString.

  ```javascript
  const pattern = date.compile('MMM D YYYY');

  date.format(new Date(2020, 2, 3), pattern); // => Mar 3 2020
  date.format(new Date(2020, 3, 4), pattern); // => Apr 4 2020
  date.format(new Date(2020, 4, 5), pattern); // => May 5 2020
  ```

  - The `parse()` now supports `...` (ellipsis) token. The `preparse()` and the `isValid()` are too.

  ```javascript
  // Cannot write like this even if you want to get only a date part.
  date.parse('Mar 05 2020 10:42:29 GMT-0800', 'MMM D YYYY');  // => Invalid Date

  // Previously, it was necessary to adjust the length of the format string by appending white spaces of the same length as a part to ignore.
  date.parse('Mar 05 2020 10:42:29 GMT-0800', 'MMM D YYYY                  ');

  // Can write simply like this using the ellipsis token.
  date.parse('Mar 05 2020 10:42:29 GMT-0800', 'MMM D YYYY...');
  ```

  - Added `day-of-week` plugin for the parser. However this is a dummy, not effective at all. See [PLUGINS.md](./PLUGINS.md) for details.

  ```javascript
  // If a date string has day of week at the head, cannot parse it unless remove that part from it or fill white spaces that part of the format string.
  date.parse('Thu Mar 05 2020 10:42:29 GMT-0800', '    MMM D YYYY...');

  // This plugin provides `dd`, `ddd` and `dddd` tokens for such a case. However they are not effective at all because day of week has not information to identify a date.
  date.parse('Thu Mar 05 2020 10:42:29 GMT-0800', 'ddd MMM D YYYY...');
  ```

  - (**Breaking Change**) The `subtract()` now returns a **REAL** number. Previously, it returned values with truncated decimals.

  ```javascript
  const now = new Date(2020, 2, 5, 1, 2, 3, 4);
  const new_years_day = new Date(2020, 0, 1);

  date.subtract(now, new_years_day).toDays(); // => 64.04309032407407
  ```

  - Added `timespan` plugin. This plugin provides `timeSpan()` function to display a formatted elapsed time. This will might be integrated with the `subtract()`. See [PLUGINS.md](./PLUGINS.md) for details.

  ```javascript
  const now = new Date(2020, 2, 5, 1, 2, 3, 4);
  const new_years_day = new Date(2020, 0, 1);

  date.timeSpan(now, new_years_day).toDays('D HH:mm:ss.SSS'); // => '64 01:02:03.004'
  date.timeSpan(now, new_years_day).toHours('H [hours] m [minutes] s [seconds]');  // => '1537 hours 2 minutes 3 seconds'
  ```

  - Added `microsecond` plugin for the parser. Microsecond is not supported by date objects so that it is rounded `millisecond` at the inside. See [PLUGINS.md](./PLUGINS.md) for details.

- 0.12.0
  - The parser now supports `Z` token to parse timezone offset.
  - (**Breaking Change**) **Excleded `YY` token from the parser**, added it as `two-digit-year` plugin. See [PLUGINS.md](./PLUGINS.md) for details.
  - (**Breaking Change**) Decided to **change the default behavior of `A` token** to fix the non-intuitive definition. Sepcifically, in the `format()` it now outputs `AM` / `PM` instead of `a.m.` / `p.m.`, and in the `parse()` it recognizes `AM` / `PM` only. Other `A` tokens are supported as `meridiem` plugin.

    | token | new meaning                        | example    | default |
    |:------|:-----------------------------------|:-----------|:--------|
    | A     | meridiem (uppercase)               | AM, PM     | ✔️       |
    | AA    | meridiem (uppercase with ellipsis) | A.M., P.M. |         |
    | a     | meridiem (lowercase)               | am, pm     |         |
    | aa    | meridiem (lowercase with ellipsis) | a.m., p.m. |         |

- 0.11.0
  - Added `compile()` function that precompiling a date-time string for the parser. If you need to process many date-time string with one format, you can get results faster than before by precompiling the format string with this function.

  ```javascript
  // We have passed a string format at the 2nd parameter each time when calling the parse() function.
  date.parse('Mar 22 2019 2:54:21 PM', 'MMM D YYYY h:m:s A');
  date.parse('Jul 27 2019 4:15:24 AM', 'MMM D YYYY h:m:s A');
  date.parse('Dec 25 2019 3:51:11 AM', 'MMM D YYYY h:m:s A');

  // You can precompile the string format.
  const pattern = date.compile('MMM D YYYY h:m:s A');

  // The parse() will be able to finish faster than passing the format string each time.
  date.parse('Mar 22 2019 2:54:21 PM', pattern);
  date.parse('Jul 27 2019 4:15:24 AM', pattern);
  date.parse('Dec 25 2019 3:51:11 AM', pattern);
  ```

  ```javascript
  const pattern = date.compile('MMM D YYYY h:m:s A');

  // The isValid() will also too.
  date.isValid('Mar 22 2019 2:54:21 PM', pattern);
  ```

## Usage

- Node.js:

```javascript
const date = require('date-and-time');
```

- With a transpiler:

```javascript
import date from 'date-and-time';
```

- The browser:

```javascript
window.date;    // global object
```

## API

### format(dateObj, formatString[, utc])

- Formatting a date.
  - @param {**Date**} dateObj - a Date object
  - @param {**string|Array.\<string\>**} arg - a format string or a compiled object
  - @param {**boolean**} [utc] - output as UTC
  - @returns {**string**} a formatted string

```javascript
const now = new Date();
date.format(now, 'YYYY/MM/DD HH:mm:ss');    // => '2015/01/02 23:14:05'
date.format(now, 'ddd, MMM DD YYYY');       // => 'Fri, Jan 02 2015'
date.format(now, 'hh:mm A [GMT]Z');         // => '11:14 PM GMT-0800'
date.format(now, 'hh:mm A [GMT]Z', true);   // => '07:14 AM GMT+0000'

const pattern = date.compile('ddd, MMM DD YYYY');
date.format(now, pattern);                  // => 'Fri, Jan 02 2015'
```

Available tokens and their meanings are as follows:

| token | meaning                              | examples of output |
|:------|:-------------------------------------|:-------------------|
| YYYY  | four-digit year                      | 0999, 2015         |
| YY    | two-digit year                       | 99, 01, 15         |
| Y     | four-digit year without zero-padding | 2, 44, 888, 2015   |
| MMMM  | month name (long)                    | January, December  |
| MMM   | month name (short)                   | Jan, Dec           |
| MM    | month with zero-padding              | 01, 12             |
| M     | month                                | 1, 12              |
| DD    | date with zero-padding               | 02, 31             |
| D     | date                                 | 2, 31              |
| dddd  | day of week (long)                   | Friday, Sunday     |
| ddd   | day of week (short)                  | Fri, Sun           |
| dd    | day of week (very short)             | Fr, Su             |
| HH    | 24-hour with zero-padding            | 23, 08             |
| H     | 24-hour                              | 23, 8              |
| hh    | 12-hour with zero-padding            | 11, 08             |
| h     | 12-hour                              | 11, 8              |
| A     | meridiem (uppercase)                 | AM, PM             |
| mm    | minute with zero-padding             | 14, 07             |
| m     | minute                               | 14, 7              |
| ss    | second with zero-padding             | 05, 10             |
| s     | second                               | 5, 10              |
| SSS   | millisecond (high accuracy)          | 753, 022           |
| SS    | millisecond (middle accuracy)        | 75, 02             |
| S     | millisecond (low accuracy)           | 7, 0               |
| Z     | timezone offset                      | +0100, -0800       |

You can also use the following tokens by importing plugins. See [PLUGINS.md](./PLUGINS.md) for details.

| token | meaning                              | examples of output |
|:------|:-------------------------------------|:-------------------|
| DDD   | ordinal notation of date             | 1st, 2nd, 3rd      |
| AA    | meridiem (uppercase with ellipsis)   | A.M., P.M.         |
| a     | meridiem (lowercase)                 | am, pm             |
| aa    | meridiem (lowercase with ellipsis)   | a.m., p.m.         |

#### NOTE 1. Comments

String in parenthese `[...]` in the `formatString` will be ignored as comments:

```javascript
date.format(new Date(), 'DD-[MM]-YYYY');    // => '02-MM-2015'
date.format(new Date(), '[DD-[MM]-YYYY]');  // => 'DD-[MM]-YYYY'
```

#### NOTE 2. Output as UTC

This function usually outputs a local date-time string. Set to true the `utc` option (the 3rd parameter) if you would like to get a UTC date-time string.

```javascript
date.format(new Date(), 'hh:mm A [GMT]Z');          // => '11:14 PM GMT-0800'
date.format(new Date(), 'hh:mm A [GMT]Z', true);    // => '07:14 AM GMT+0000'
```

#### NOTE 3. More Tokens

You can also define your own tokens. See [EXTEND.md](./EXTEND.md) for details.

### parse(dateString, arg[, utc])

- Parsing a date string.
  - @param {**string**} dateString - a date string
  - @param {**string|Array.\<string\>**} arg - a format string or a compiled object
  - @param {**boolean**} [utc] - input as UTC
  - @returns {**Date**} a constructed date

```javascript
date.parse('2015/01/02 23:14:05', 'YYYY/MM/DD HH:mm:ss');   // => Jan 2 2015 23:14:05 GMT-0800
date.parse('02-01-2015', 'DD-MM-YYYY');                     // => Jan 2 2015 00:00:00 GMT-0800
date.parse('11:14:05 PM', 'hh:mm:ss A');                    // => Jan 1 1970 23:14:05 GMT-0800
date.parse('11:14:05 PM', 'hh:mm:ss A', true);              // => Jan 1 1970 23:14:05 GMT+0000 (Jan 1 1970 15:14:05 GMT-0800)
date.parse('23:14:05 GMT+0900', 'HH:mm:ss [GMT]Z');         // => Jan 1 1970 23:14:05 GMT+0900 (Jan 1 1970 06:14:05 GMT-0800)
date.parse('Jam 1 2017', 'MMM D YYYY');                     // => Invalid Date
date.parse('Feb 29 2017', 'MMM D YYYY');                    // => Invalid Date
```

Available tokens and their meanings are as follows:

| token  | meaning                              | examples of acceptable form            |
|:-------|:-------------------------------------|:---------------------------------------|
| YYYY   | four-digit year                      | 0999, 2015                             |
| Y      | four-digit year without zero-padding | 2, 44, 88, 2015                        |
| MMMM   | month name (long)                    | January, December                      |
| MMM    | month name (short)                   | Jan, Dec                               |
| MM     | month with zero-padding              | 01, 12                                 |
| M      | month                                | 1, 12                                  |
| DD     | date with zero-padding               | 02, 31                                 |
| D      | date                                 | 2, 31                                  |
| HH     | 24-hour with zero-padding            | 23, 08                                 |
| H      | 24-hour                              | 23, 8                                  |
| hh     | 12-hour with zero-padding            | 11, 08                                 |
| h      | 12-hour                              | 11, 8                                  |
| A      | meridiem (uppercase)                 | AM, PM                                 |
| mm     | minute with zero-padding             | 14, 07                                 |
| m      | minute                               | 14, 7                                  |
| ss     | second with zero-padding             | 05, 10                                 |
| s      | second                               | 5, 10                                  |
| SSS    | millisecond (high accuracy)          | 753, 022                               |
| SS     | millisecond (middle accuracy)        | 75, 02                                 |
| S      | millisecond (low accuracy)           | 7, 0                                   |
| Z      | timezone offset                      | +0100, -0800                           |

You can also use the following tokens by importing plugins. See [PLUGINS.md](./PLUGINS.md) for details.

| token  | meaning                              | examples of acceptable form            |
|:-------|:-------------------------------------|:---------------------------------------|
| YY     | two-digit year                       | 90, 00, 08, 19                         |
| Y      | two-digit year without zero-padding  | 90, 0, 8, 19                           |
| A      | meridiem                             | AM, PM, A.M., P.M., am, pm, a.m., p.m. |
| dddd   | day of week (long)                   | Friday, Sunday                         |
| ddd    | day of week (short)                  | Fri, Sun                               |
| dd     | day of week (very short)             | Fr, Su                                 |
| SSSSSS | microsecond (high accuracy)          | 123456, 000001                         |
| SSSSS  | microsecond (middle accuracy)        | 12345, 00001                           |
| SSSS   | microsecond (low accuracy)           | 1234, 0001                             |

#### NOTE 1. Invalid Date

If the function fails to parse, it will return `Invalid Date`. Notice that the `Invalid Date` is a Date object, not `NaN` or `null`. You can tell whether the Date object is invalid as follows:

```javascript
const today = date.parse('Jam 1 2017', 'MMM D YYYY');

if (isNaN(today)) {
    // Failure
}
```

#### NOTE 2. Input as UTC

This function usually assumes the `dateString` is a local date-time. Set to true the `utc` option (the 3rd parameter) if it is a UTC date-time.

```javascript
date.parse('11:14:05 PM', 'hh:mm:ss A');          // => Jan 1 1970 23:14:05 GMT-0800
date.parse('11:14:05 PM', 'hh:mm:ss A', true);    // => Jan 1 1970 23:14:05 GMT+0000 (Jan 1 1970 15:14:05 GMT-0800)
```

#### NOTE 3. Default Date Time

Default date is `January 1, 1970`, time is `00:00:00.000`. Values not passed will be complemented with them:

```javascript
date.parse('11:14:05 PM', 'hh:mm:ss A');    // => Jan 1 1970 23:14:05 GMT-0800
date.parse('Feb 2000', 'MMM YYYY');         // => Feb 1 2000 00:00:00 GMT-0800
```

#### NOTE 4. Max Date / Min Date

Parsable maximum date is `December 31, 9999`, minimum date is `January 1, 0001`.

```javascript
date.parse('Dec 31 9999', 'MMM D YYYY');    // => Dec 31 9999 00:00:00 GMT-0800
date.parse('Dec 31 10000', 'MMM D YYYY');   // => Invalid Date

date.parse('Jan 1 0001', 'MMM D YYYY');     // => Jan 1 0001 00:00:00 GMT-0800
date.parse('Jan 1 0000', 'MMM D YYYY');     // => Invalid Date
```

#### NOTE 5. 12-hour notation and Meridiem

If use `hh` or `h` (12-hour) token, use together `A` (meridiem) token to get the right value.

```javascript
date.parse('11:14:05', 'hh:mm:ss');         // => Jan 1 1970 11:14:05 GMT-0800
date.parse('11:14:05 PM', 'hh:mm:ss A');    // => Jan 1 1970 23:14:05 GMT-0800
```

#### NOTE 6. Comments

String in parenthese `[...]` in the `formatString` will be ignored as comments:

```javascript
date.parse('12 hours 34 minutes', 'HH hours mm minutes');       // => Invalid Date
date.parse('12 hours 34 minutes', 'HH [hours] mm [minutes]');   // => Jan 1 1970 12:34:00 GMT-0800
```

#### NOTE 7. Wildcard

A white space works as a wildcard token. This token is not interpret into anything. This means it can be ignored a specific variable string. For example, when you would like to ignore a time part from a date string, you can write as follows:

```javascript
// This will be an error.
date.parse('2015/01/02 11:14:05', 'YYYY/MM/DD');            // => Invalid Date
// Adjust the length of the format string by appending white spaces of the same length as a part to ignore to the end of it.
date.parse('2015/01/02 11:14:05', 'YYYY/MM/DD         ');   // => Jan 2 2015 00:00:00 GMT-0800
```

#### NOTE 8. Ellipsis

The parser supports `...` (ellipse) token. The above example can also be written like this:

```javascript
date.parse('2015/01/02 11:14:05', 'YYYY/MM/DD...');   // => Jan 2 2015 00:00:00 GMT-0800
```

### compile(formatString)

- Compiling a format string for the parser.
  - @param {**string**} formatString - a format string
  - @returns {**Array.\<string\>**} a compiled object

```javascript
  const pattern = date.compile('MMM D YYYY h:m:s A');

  date.parse('Mar 22 2019 2:54:21 PM', pattern);
  date.parse('Jul 27 2019 4:15:24 AM', pattern);
  date.parse('Dec 25 2019 3:51:11 AM', pattern);

  date.format(new Date(), pattern); // => Mar 16 2020 6:24:56 PM
```

If you are going to call the `format()`, the `parse()` or the `isValid()` many times with one string format, recommended to precompile and reuse it for performance.

### preparse(dateString, arg)

- Pre-parsing a date string.
  - @param {**string**} dateString - a date string
  - @param {**string|Array.\<string\>**} arg - a format string or a compiled object
  - @returns {**Object**} a date structure

This function takes exactly the same parameters with the `parse()`, but returns a date structure as follows unlike that:

```javascript
date.preparse('Fri Jan 2015 02 23:14:05 GMT-0800', '    MMM YYYY DD HH:mm:ss [GMT]Z');

{
    Y: 2015,        // Year
    M: 1,           // Month
    D: 2,           // Day
    H: 23,          // 24-hour
    A: 0,           // Meridiem
    h: 0,           // 12-hour
    m: 14,          // Minute
    s: 5,           // Second
    S: 0,           // Millisecond
    Z: 480,         // Timsezone offset
    _index: 33,     // Pointer offset
    _length: 33,    // Length of the date string
    _match: 7       // Token matching count
}
```

This date structure provides a parsing result. You will be able to tell from it how the date string was parsed(, or why the parsing was failed).

### isValid(arg1[, arg2])

- Validation.
  - @param {**Object|string**} arg1 - a date structure or a date string
  - @param {**string|Array.\<string\>**} [arg2] - a format string or a compiled object
  - @returns {**boolean**} whether the date string is a valid date

This function takes either exactly the same parameters with the `parse()` or a date structure which the `preparse()` returns, evaluates the validity of them.

```javascript
date.isValid('2015/01/02 23:14:05', 'YYYY/MM/DD HH:mm:ss'); // => true
date.isValid('29-02-2015', 'DD-MM-YYYY');                   // => false
```

```javascript
const result = date.preparse('2015/01/02 23:14:05', 'YYYY/MM/DD HH:mm:ss');
date.isValid(result);   // => true
```

### addYears(dateObj, years)

- Adding years.
  - @param {**Date**} dateObj - a Date object
  - @param {**number**} years - number of years to add
  - @returns {**Date**} a date after adding the value

```javascript
const now = new Date();
const next_year = date.addYears(now, 1);
```

### addMonths(dateObj, months)

- Adding months.
  - @param {**Date**} dateObj - a Date object
  - @param {**number**} months - number of months to add
  - @returns {**Date**} a date after adding the value

```javascript
const now = new Date();
const next_month = date.addMonths(now, 1);
```

### addDays(dateObj, days)

- Adding days.
  - @param {**Date**} dateObj - a Date object
  - @param {**number**} days - number of days to add
  - @returns {**Date**} a date after adding the value

```javascript
const now = new Date();
const yesterday = date.addDays(now, -1);
```

### addHours(dateObj, hours)

- Adding hours.
  - @param {**Date**} dateObj - a Date object
  - @param {**number**} hours - number of hours to add
  - @returns {**Date**} a date after adding the value

```javascript
const now = new Date();
const an_hour_ago = date.addHours(now, -1);
```

### addMinutes(dateObj, minutes)

- Adding minutes.
  - @param {**Date**} dateObj - a Date object
  - @param {**number**} minutes - number of minutes to add
  - @returns {**Date**} a date after adding the value

```javascript
const now = new Date();
const two_minutes_later = date.addMinutes(now, 2);
```

### addSeconds(dateObj, seconds)

- Adding seconds.
  - @param {**Date**} dateObj - a Date object
  - @param {**number**} seconds - number of seconds to add
  - @returns {**Date**} a date after adding the value

```javascript
const now = new Date();
const three_seconds_ago = date.addSeconds(now, -3);
```

### addMilliseconds(dateObj, milliseconds)

- Adding milliseconds.
  - @param {**Date**} dateObj - a Date object
  - @param {**number**} milliseconds - number of milliseconds to add
  - @returns {**Date**} a date after adding the value

```javascript
const now = new Date();
const a_millisecond_later = date.addMilliseconds(now, 1);
```

### subtract(date1, date2)

- Subtracting.
  - @param {**Date**} date1 - a Date object
  - @param {**Date**} date2 - a Date object
  - @returns {**Object**} a result object subtracting date2 from date1

```javascript
const today = new Date(2015, 0, 2);
const yesterday = new Date(2015, 0, 1);

date.subtract(today, yesterday).toDays();           // => 1 = today - yesterday
date.subtract(today, yesterday).toHours();          // => 24
date.subtract(today, yesterday).toMinutes();        // => 1440
date.subtract(today, yesterday).toSeconds();        // => 86400
date.subtract(today, yesterday).toMilliseconds();   // => 86400000
```

### isLeapYear(y)

- Leap year.
  - @param {**number**} y - year
  - @returns {**boolean**} whether the year is a leap year

```javascript
date.isLeapYear(2015);  // => false
date.isLeapYear(2012);  // => true
```

### isSameDay(date1, date2)

- Comparison of two dates.
  - @param {**Date**} date1 - a Date object
  - @param {**Date**} date2 - a Date object
  - @returns {**boolean**} whether the dates are the same day (times are ignored)

```javascript
const date1 = new Date(2017, 0, 2, 0);          // Jan 2 2017 00:00:00
const date2 = new Date(2017, 0, 2, 23, 59);     // Jan 2 2017 23:59:00
const date3 = new Date(2017, 0, 1, 23, 59);     // Jan 1 2017 23:59:00
date.isSameDay(date1, date2);   // => true
date.isSameDay(date1, date3);   // => false
```

### locale([code[, locale]])

- Change locale or setting a new locale definition.
  - @param {**string**} [code] - language code
  - @param {**Object**} [locale] - locale definition
  - @returns {**string**} current language code

It returns a current language code if called without any parameters.

```javascript
date.locale();  // => "en"
```

To switch to any other language, call it with a language code.

```javascript
date.locale('es');  // Switch to Spanish
```

See [LOCALE.md](./LOCALE.md) for details.

### extend(extension)

- Locale extension.
  - @param {**Object**} extension - locale definition
  - @returns {**void**}

Extend a current locale. See [EXTEND.md](./EXTEND.md) for details.

### plugin(name[, extension])

- Plugin import or definition.
  - @param {**string**} name - plugin name
  - @param {**Object**} [extension] - locale definition
  - @returns {**void**}

Plugin is a named locale definition defined with the `extend()`. See [PLUGINS.md](./PLUGINS.md) for details.

## Browser Support

Chrome, Firefox, Safari, Edge, and Internet Explorer 6+.

## License

MIT
