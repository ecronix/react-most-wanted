# gcs-resumable-upload
> Upload a file to Google Cloud Storage with built-in resumable behavior

```sh
$ npm install gcs-resumable-upload
```
```js
const {upload} = require('gcs-resumable-upload');
const fs = require('fs');

fs.createReadStream('titanic.mov')
  .pipe(upload({ bucket: 'legally-owned-movies', file: 'titanic.mov' }))
  .on('progress', (progress) => {
    console.log('Progress event:')
    console.log('\t bytes: ', progress.bytesWritten);
  })
  .on('finish', () => {
    // Uploaded!
  });
```

Or from the command line:

```sh
$ npm install -g gcs-resumable-upload
$ cat titanic.mov | gcs-upload legally-owned-movies titanic.mov
```

If somewhere during the operation, you lose your connection to the internet or your tough-guy brother slammed your laptop shut when he saw what you were uploading, the next time you try to upload to that file, it will resume automatically from where you left off.

## How it works

This module stores a file using [ConfigStore](http://gitnpm.com/configstore) that is written to when you first start an upload. It is aliased by the file name you are uploading to and holds the first 16kb chunk of data* as well as the unique resumable upload URI. ([Resumable uploads are complicated](https://cloud.google.com/storage/docs/json_api/v1/how-tos/upload#resumable))

If your upload was interrupted, next time you run the code, we ask the API how much data it has already, then simply dump all of the data coming through the pipe that it already has.

After the upload completes, the entry in the config file is removed. Done!

\* The first 16kb chunk is stored to validate if you are sending the same data when you resume the upload. If not, a new resumable upload is started with the new data.

## Authentication

Oh, right. This module uses [google-auth-library](http://gitnpm.com/google-auth-library) and accepts all of the configuration that module does to strike up a connection as `config.authConfig`. See [`authConfig`](https://github.com/google/google-auth-library-nodejs/#choosing-the-correct-credential-type-automatically).

## API

```js
const {gcsResumableUpload} = require('gcs-resumable-upload')
const upload = gcsResumableUpload(config)
```

`upload` is an instance of [`Duplexify`](http://gitnpm.com/duplexify).

---
<a name="methods"></a>
### Methods

#### upload.createURI(callback)

##### callback(err, resumableURI)

###### callback.err

- Type: `Error`

Invoked if the authorization failed or the request to start a resumable session failed.

###### callback.resumableURI

- Type: `String`

The resumable upload session URI.


#### upload.deleteConfig()

This will remove the config data associated with the provided file.

---
<a name="config"></a>
### Configuration

#### config

- Type: `object`

Configuration object.

##### config.authClient

- Type: [`GoogleAuth`](http://gitnpm.com/google-auth-library)
- *Optional*

If you want to re-use an auth client from [google-auth-library](http://gitnpm.com/google-auth-library), pass an instance here.

##### config.authConfig

- Type: `object`
- *Optional*

See [`authConfig`](https://github.com/google/google-auth-library-nodejs/#choosing-the-correct-credential-type-automatically).

##### config.bucket

- Type: `string`
- **Required**

The name of the destination bucket.

##### config.configPath

- Type: `string`
- *Optional*

Where the gcs-resumable-upload configuration file should be stored on your system. This maps to the [configstore option by the same name](https://github.com/yeoman/configstore/tree/0df1ec950d952b1f0dfb39ce22af8e505dffc71a#configpath).

##### config.file

- Type: `string`
- **Required**

The name of the destination file.

##### config.generation

- Type: `number`
- *Optional*

This will cause the upload to fail if the current generation of the remote object does not match the one provided here.

##### config.key

- Type: `string|buffer`
- *Optional*

A [customer-supplied encryption key](https://cloud.google.com/storage/docs/encryption#customer-supplied).

##### config.kmsKeyName

- Type: `string`
- *Optional*

Resource name of the Cloud KMS key, of the form `projects/my-project/locations/global/keyRings/my-kr/cryptoKeys/my-key`, that will be used to encrypt the object. Overrides the object metadata's `kms_key_name` value, if any.

##### config.metadata

- Type: `object`
- *Optional*

Any metadata you wish to set on the object.

###### *config.metadata.contentLength*

Set the length of the file being uploaded.

###### *config.metadata.contentType*

Set the content type of the incoming data.

##### config.offset

- Type: `number`
- *Optional*

The starting byte of the upload stream, for [resuming an interrupted upload](https://cloud.google.com/storage/docs/json_api/v1/how-tos/resumable-upload#resume-upload).

##### config.origin

- Type: `string`
- *Optional*

Set an Origin header when creating the resumable upload URI.

##### config.predefinedAcl

- Type: `string`
- *Optional*

Apply a predefined set of access controls to the created file.

Acceptable values are:

  - **`authenticatedRead`** - Object owner gets `OWNER` access, and `allAuthenticatedUsers` get `READER` access.
  - **`bucketOwnerFullControl`** - Object owner gets `OWNER` access, and project team owners get `OWNER` access.
  - **`bucketOwnerRead`** - Object owner gets `OWNER` access, and project team owners get `READER` access.
  - **`private`** - Object owner gets `OWNER` access.
  - **`projectPrivate`** - Object owner gets `OWNER` access, and project team members get access according to their roles.
  - **`publicRead`** - Object owner gets `OWNER` access, and `allUsers` get `READER` access.

##### config.private

- Type: `boolean`
- *Optional*

Make the uploaded file private. (Alias for `config.predefinedAcl = 'private'`)

##### config.public

- Type: `boolean`
- *Optional*

Make the uploaded file public. (Alias for `config.predefinedAcl = 'publicRead'`)

##### config.uri

- Type: `string`
- *Optional*

If you already have a resumable URI from a previously-created resumable upload, just pass it in here and we'll use that.

##### config.userProject

- Type: `string`
- *Optional*

If the bucket being accessed has `requesterPays` functionality enabled, this can be set to control which project is billed for the access of this file.

---
<a name="events"></a>
### Events

#### .on('error', function (err) {})

##### err

- Type: `Error`

Invoked if the authorization failed, the request failed, or the file wasn't successfully uploaded.

#### .on('response', function (response) {})

##### resp

- Type: `Object`

The [response object from Gaxios](https://github.com/JustinBeckwith/gaxios/blob/88a47e000625d8192689acac5c40c0b1e1d963a2/src/gaxios.ts#L197-L203).

##### metadata

- Type: `Object`

The file's new metadata.

#### .on('progress', function (progress) {})

#### progress

- Type: `Object`

##### progress.bytesWritten

- Type: `number`

##### progress.contentLength

- Type: `number`

Progress event provides upload stats like Transferred Bytes and content length.

#### .on('finish', function () {})

The file was uploaded successfully.

---
<a name="static-methods"></a>
### Static Methods

```js
const {createURI} = require('gcs-resumable-upload')
````

#### createURI([config](#config), callback)

##### callback(err, resumableURI)

###### callback.err

- Type: `Error`

Invoked if the authorization failed or the request to start a resumable session failed.

###### callback.resumableURI

- Type: `String`

The resumable upload session URI.
