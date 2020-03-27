/**
 * A super simple script to slap together some GitHub pages
 * 
 * Before running this you should:
 * 
 *  - Check out the gh-pages branch in a folder with the same name
 *  - Build the project (yarn build)
 *  - Publish (yarn publish)
 * 
 * Then run `yarn gh-pages`. CD into the gh-pages folder, commit, and push.
 */

const sh = require('shelljs')
const version = require('../lerna.json').version

sh.config.silent = true

const demoHtmlStr = sh.cat('packages/ivh-base-style/demo.html').toString()
const demoCssStr = sh.cat('packages/ivh-base-style/demo.css').toString()
const distCssStr = sh.cat('packages/ivh-base-style/dist/ivh-base-style.css').toString()

const htmlLines = demoHtmlStr.split('\n')
  .map(_l => {
    l = _l.trim()
    if (l.startsWith('<!-- START: DIST-CSS -->')) {
      return `<style>${distCssStr}</style>`
    } else if (l.startsWith('<!-- START: DEMO-CSS -->')) {
      return `<style>${demoCssStr}</style>`
    } else if (l.startsWith('<!-- START: TITLE -->')) {
      return `<title>Base Styles for iVantage v${version}</title>`
    }
    return _l
  })

sh.ShellString(htmlLines.join('\n')).to('gh-pages/index.html')