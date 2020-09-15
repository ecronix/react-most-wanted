# hash-stream-validation
> Hash a stream of data, then validate

```sh
$ npm install --save hash-stream-validation
```
```js
var hashStreamValidation = require('hash-stream-validation');

var validateStream = hashStreamValidation();

fs.createReadStream(filePath)
  .pipe(validateStream)
  .on('data', function() { /*... */ })
  .on('end', function() {
    validateStream.test('md5', /*checksum*/);
  });
```

## Do this for faster crc32c computation

If the speeds are too slow for your use, this module will `try` to require [`fast-crc32c`](http://gitnpm.com/fast-crc32c). We chose not to make it an `optionalDependency` because npm's scary warning output confuses users into thinking their hard drive was just erased.


```js
$ npm install --save fast-crc32c
```

## Use Case

After a successful upload to a Google Cloud Storage bucket, the API will respond with the hash of data it has received. During our upload, we can run the data through this module, then confirm after the upload if we both arrived at the same results. If not, we know something went wrong during the transmission.

## API

### validateStream = hashStreamValidation([opts])

#### opts.crc32c
- Type: `Boolean`
- Default: `true`

Enable crc32c hashing via [sse4_crc32](https://gitnpm.com/sse4_crc32).*

* Note: Any issues installing this module on your system should be opened at their repository.

#### opts.md5
- Type: `Boolean`
- Default: `true`

Enable MD5 hashing.

### validateStream.test(algo, sum)

#### algo
- Type: `String`

The alogrithm to test the sum against ('crc32c' or 'md5').

#### sum
- Type: `String`

The base64-encoded sum to validate.
