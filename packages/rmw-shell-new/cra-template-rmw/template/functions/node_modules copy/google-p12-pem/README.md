[//]: # "This README.md file is auto-generated, all changes to this file will be lost."
[//]: # "To regenerate it, use `python -m synthtool`."
<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# [google-p12-pem: Node.js Client](https://github.com/googleapis/google-p12-pem)

[![release level](https://img.shields.io/badge/release%20level-general%20availability%20%28GA%29-brightgreen.svg?style=flat)](https://cloud.google.com/terms/launch-stages)
[![npm version](https://img.shields.io/npm/v/google-p12-pem.svg)](https://www.npmjs.org/package/google-p12-pem)
[![codecov](https://img.shields.io/codecov/c/github/googleapis/google-p12-pem/master.svg?style=flat)](https://codecov.io/gh/googleapis/google-p12-pem)




Convert Google .p12 keys to .pem keys.




* [github.com/googleapis/google-p12-pem](https://github.com/googleapis/google-p12-pem)

Read more about the client libraries for Cloud APIs, including the older
Google APIs Client Libraries, in [Client Libraries Explained][explained].

[explained]: https://cloud.google.com/apis/docs/client-libraries-explained

**Table of contents:**


* [Quickstart](#quickstart)

  * [Installing the client library](#installing-the-client-library)
  * [Using the client library](#using-the-client-library)
* [Samples](#samples)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [License](#license)

## Quickstart

### Installing the client library

```bash
npm install google-p12-pem
```


### Using the client library

```javascript
  const {getPem} = require('google-p12-pem');

  /**
   * Given a p12 file, convert it to the PEM format.
   * @param {string} pathToCert The relative path to a p12 file.
   */
  async function quickstart() {
    // TODO(developer): provide the path to your cert
    // const pathToCert = 'path/to/cert.p12';

    const pem = await getPem(pathToCert);
    console.log('The converted PEM:');
    console.log(pem);
  }

  quickstart();

```
#### CLI style

``` sh
gp12-pem myfile.p12 > output.pem
```


## Samples

Samples are in the [`samples/`](https://github.com/googleapis/google-p12-pem/tree/master/samples) directory. The samples' `README.md`
has instructions for running the samples.

| Sample                      | Source Code                       | Try it |
| --------------------------- | --------------------------------- | ------ |
| Quickstart | [source code](https://github.com/googleapis/google-p12-pem/blob/master/samples/quickstart.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/google-p12-pem&page=editor&open_in_editor=samples/quickstart.js,samples/README.md) |



## Versioning

This library follows [Semantic Versioning](http://semver.org/).


This library is considered to be **General Availability (GA)**. This means it
is stable; the code surface will not change in backwards-incompatible ways
unless absolutely necessary (e.g. because of critical security issues) or with
an extensive deprecation period. Issues and requests against **GA** libraries
are addressed with the highest priority.





More Information: [Google Cloud Platform Launch Stages][launch_stages]

[launch_stages]: https://cloud.google.com/terms/launch-stages

## Contributing

Contributions welcome! See the [Contributing Guide](https://github.com/googleapis/google-p12-pem/blob/master/CONTRIBUTING.md).

## License

Apache Version 2.0

See [LICENSE](https://github.com/googleapis/google-p12-pem/blob/master/LICENSE)



[shell_img]: https://gstatic.com/cloudssh/images/open-btn.png
[projects]: https://console.cloud.google.com/project
[billing]: https://support.google.com/cloud/answer/6293499#enable-billing

[auth]: https://cloud.google.com/docs/authentication/getting-started
