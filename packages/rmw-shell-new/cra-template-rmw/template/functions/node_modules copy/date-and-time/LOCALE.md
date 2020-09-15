# Locale

Month, day of week, and meridiem (am / pm) the `format()` outputs are usually in English, and the `parse()` also assumes that a passed date string is English.

## Usage

If you would like to use any other language in these functions, switch as follows:

- Node.js:

```javascript
const date = require('date-and-time');
require('date-and-time/locale/fr');

date.locale('fr');  // French
date.format(new Date(), 'dddd D MMMM'); // => 'lundi 11 janvier'
```

- With a transpiler:

```javascript
import date from 'date-and-time';
import 'date-and-time/locale/it';

date.locale('it');  // Italian
date.format(new Date(), 'dddd D MMMM'); // => 'Lunedì 11 gennaio'
```

- With an older browser:

```html
<script src="/path/to/date-and-time.min.js"></script>
<script src="/path/to/locale/zh-cn.js"></script>

<script>
date.locale('zh-cn');  // Chinese
date.format(new Date(), 'MMMD日dddd');  // => '1月11日星期一'
</script>
```

### NOTE

- You have to import (or require) in advance the all locale modules that you are going to switch to.
- The locale will be actually switched after executing `locale('xx')`.
- You could return the locale to English by executing `locale ('en')`.

## Supported List

For now, it supports the following languages:  

```text
Arabic (ar)
Azerbaijani (az)
Bengali (bn)
Burmese (my)
Chinese (zh-cn)
Chinese (zh-tw)
Czech (cs)
Danish (dk)
Dutch (nl)
English (en)
French (fr)
German (de)
Greek (el)
Hindi (hi)
Hungarian (hu)
Indonesian (id)
Italian (it)
Japanese (ja)
Javanese (jv)
Korean (ko)
Persian (fa)
Polish (pl)
Portuguese (pt)
Punjabi (pa-in)
Romanian (ro)
Russian (ru)
Serbian (sr)
Spanish (es)
Thai (th)
Turkish (tr)
Ukrainian (uk)
Uzbek (uz)
Vietnamese (vi)
```
