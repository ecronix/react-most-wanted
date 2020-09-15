# Extension

By using `extend()`, you could add your own tokens or modify behavior of existing tokens. This is equivalent to define a new plugin without name.

## Token

Tokens in this library have the following rules:

- All of the characters must be the same alphabet (`A-Z, a-z`).

```javascript
'E'           // Good
'EE'          // Good
'EEEEEEEEEE'  // Good, but why so long!?
'EES'         // Not good
'???'         // Not good
```

- It is case sensitive.

```javascript
'eee'         // Good
'Eee'         // Not good
```

- To the parser, it is not able to add token of new alphabet.

```javascript
'EEE'         // This is not able to add because `E` is not an existing token in the parser.
'YYY'         // This is OK because `Y` token is existing in the parser.
'SSS'         // This is modifying, not adding. Because exactly the same token is existing.
```

## Examples

### Example 1

Add `E` token to the formatter. This new token will output "decade" like this:

```javascript
const d1 =  new Date(2020, 0, 1);
const d2 =  new Date(2019, 0, 1);

date.format(d1, '[The year] YYYY [is] E[s].');  // => "The year 2020 is 2020s."
date.format(d2, '[The year] YYYY [is] E[s].');  // => "The year 2019 is 2010s."
```

Source code example is here:

```javascript
const date = require('date-and-time');

date.extend({
  formatter: {
    E: function (d) {
      return (d.getFullYear() / 10 | 0) * 10;
    }
  }
});
```

### Example 2

In the parser, modify `MMM` token to ignore case:

```javascript
date.parse('Dec 25 2019', 'MMM DD YYYY'); // => December 25, 2019
date.parse('dec 25 2019', 'MMM DD YYYY'); // => December 25, 2019
date.parse('DEC 25 2019', 'MMM DD YYYY'); // => December 25, 2019
```

Source code example is here:

```javascript
const date = require('date-and-time');

date.extend({
  parser: {
    MMM: function (str) {
      const mmm = this.res.MMM.map(m => m.toLowerCase());
      const result = this.find(mmm, str.toLowerCase());
      result.value++;
      return result;
    }
  }
});
```

Modifying the parser may be a bit difficult. Refer to the library source code to grasp the default behavior.
