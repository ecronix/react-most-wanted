/**  EXPORT ALL FUNCTIONS
 *
 *   Loads all files that have a specific extension
 *   Default extension is .f.js
 *   Exports a cloud function matching the file name
 *
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 */
const glob = require('glob')
const camelCase = require('camelcase')

module.exports = {
  loadFunctions: (folder, exports, extension = '.f.js') => {
    const files = glob.sync(`./**/*${extension}`, {
      cwd: folder,
      ignore: './node_modules/**',
    })

    for (let f = 0, fl = files.length; f < fl; f++) {
      const file = files[f]
      const functionName = camelCase(
        file
          .split(extension)
          .join('')
          .split('/')
          .join('_')
      ) // Strip off '.f.js'
      if (
        !process.env.FUNCTION_NAME ||
        process.env.FUNCTION_NAME === functionName
      ) {
        exports[functionName] = require(file)
      }
    }
  },
}
