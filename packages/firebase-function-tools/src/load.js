/**  EXPORT ALL FUNCTIONS
 *
 *   Loads all files that have a specific extension
 *   Default extension is .f.js
 *   Exports a cloud function matching the file name
 *
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 */
/* eslint-disable */
require = require('esm')(module /*, options*/)
import { resolve } from 'path'
import glob from 'glob'
import camelCase from 'camelcase'

const loadFunctions = (folder, exports, group = false, extension = '.f.js') => {
  if (group) {
    const folders = glob.sync(`./*/`, {
      cwd: resolve(folder),
      ignore: './node_modules/**',
    })

    for (let i = 0; i < folders.length; i++) {
      const fol = folders[i]
      const folderName = fol.split('.').join('').split('/').join('')

      const folderFiles = glob.sync(`./**/*${extension}`, {
        cwd: resolve(fol),
        ignore: './node_modules/**',
      })

      const ex = {}

      for (let y = 0; y < folderFiles.length; y++) {
        const file = folderFiles[y]

        const functionName = camelCase(
          file.split(extension).join('').split('/').join('_')
        ) // Strip off '.f.js'

        const mod = require(resolve(fol, file))
        ex[functionName] = mod.default || mod
      }
      if (Object.keys(ex).length) {
        exports[folderName] = ex
      }
    }
  } else {
    const files = glob.sync(`./**/*${extension}`, {
      cwd: resolve(folder),
      ignore: './node_modules/**',
    })

    for (let f = 0, fl = files.length; f < fl; f++) {
      const file = files[f]

      const functionName = camelCase(
        file.split(extension).join('').split('/').join('_')
      ) // Strip off '.f.js'

      const mod = require(resolve(folder, file))
      exports[functionName] = mod.default || mod
    }
  }
}

export default loadFunctions

/* eslint-enable */
