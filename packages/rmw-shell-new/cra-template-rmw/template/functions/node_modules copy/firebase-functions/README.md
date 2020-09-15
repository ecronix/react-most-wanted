# Firebase SDK for Cloud Functions

The `firebase-functions` package provides an SDK for defining Cloud Functions for Firebase.

Cloud Functions is a hosted, private, and scalable Node.js environment where you can run JavaScript code. The Firebase SDK for Cloud Functions integrates the Firebase platform by letting you write code that responds to events and invokes functionality exposed by other Firebase features.

## Learn more

Learn more about the Firebase SDK for Cloud Functions in the [Firebase documentation](https://firebase.google.com/docs/functions/) or [check out our samples](https://github.com/firebase/functions-samples).

Here are some resources to get help:

- Start with the quickstart: https://firebase.google.com/docs/functions/write-firebase-functions
- Go through the guide: https://firebase.google.com/docs/functions/
- Read the full API reference: https://firebase.google.com/docs/reference/functions/
- Browse some examples: https://github.com/firebase/functions-samples

If the official documentation doesn't help, try asking through our official support channels: https://firebase.google.com/support/

_Please avoid double posting across multiple channels!_

## Usage

```js
// functions/index.js
const functions = require('firebase-functions');
const notifyUsers = require('./notify-users');

exports.newPost = functions.database
  .ref('/posts/{postId}')
  .onCreate((snapshot, context) => {
    console.log('Received new post with ID:', context.params.postId);
    return notifyUsers(snapshot.val());
  });
```

## Contributing

To contribute a change, [check out the contributing guide](.github/CONTRIBUTING.md).

## License

© Google, 2017. Licensed under [The MIT License](LICENSE).
