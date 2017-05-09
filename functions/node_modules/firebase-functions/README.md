# Firebase SDK for Cloud Functions

The `firebase-functions` package provides an SDK for defining Cloud Functions for Firebase.

Cloud Functions is a hosted, private, and scalable Node.js environment where you can run JavaScript code. The Firebase SDK for Cloud Functions integrates the Firebase platform by letting you write code that responds to events and invokes functionality exposed by other Firebase features.

_This is a Beta release of Google Cloud Functions. This API might be changed in backward-incompatible ways and is not subject to any SLA or deprecation policy._


## Learn more

Learn more about the Firebase SDK for Cloud Functions in the [Firebase documentation](https://firebase.google.com/docs/functions/) or [check out our samples](https://github.com/firebase/functions-samples).

## Usage

```js
// functions/index.js
var functions = require('firebase-functions');
var notifyUsers = require('./notify-users');

exports.newPost = functions.database
  .ref('/posts/{postId}')
  .onWrite(function(event) {
    // only execute function on creation
    if (!event.data.previous.exists()) {
      notifyUsers(event.data.val());
    }
  });
```

## Contributing

To contribute a change, [check out the contributing guide](CONTRIBUTING.md).

## License

© Google, 2017. Licensed under [The MIT License](LICENSE).
