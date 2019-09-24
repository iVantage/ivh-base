
const autoprefixer = require('autoprefixer')
const postCSSCustomProperties = require('postcss-custom-properties')
const nano = require('cssnano')
const atImport = require('postcss-import')
const theme = require('.')

module.exports = {
  plugins: [
    atImport({ path: ['lib'] }),
    autoprefixer({ grid: true }), // enable IE/Edge prefixes for grid layout
    postCSSCustomProperties({
      preserve: false,
      warnings: true,
      variables: theme.asCustomPropertyVariables()
    }),
    process.env.NODE_ENV === 'production' && nano({
      preset: ['default', {
        zindex: false
      }]
    })
  ].filter(Boolean)
}
