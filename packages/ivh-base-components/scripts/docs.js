/**
 * Builds documentation for atom level components
 */

const path = require('path')
const fs = require('fs')
const atomsConfig = require('../atoms.json')

const DOCS_FILE = path.join(__dirname, '../docs/atoms.md')

const header = `
<!--
Do not edit this file direct.

This file is automatically generated as part of the ivh-base-components library.
Changes made here will be overwritten.
-->

# Atoms

Atoms are the most basic components provided by iVH Base Components. Typically
these will be no more than individual HTML elements with iVH Base Style
classnames applied.


## Usage

All atomic components follow a consistent user patterns:

- They optionally (often) support a set of props corresponding to our semantic
classnames. More on this below.
- They optionally support some number of other props.
- They have a default element type that may be overridden by the \`cmp\` prop.
- They forward all non-recognized props to the underlying element.

Note that we also take special care to merge \`className\` prop values.


### Semantic Props

These boolean props correspond to the iVH Base Style classnames with the same
name:

- \`info\`
- \`primary\`
- \`success\`
- \`warning\`
- \`danger\`

Unless otherwise specified they default to \`false\`.

Example:

\`\`\`javascript
<AuButton warning>I'm a biter</AuButton>
\`\`\`

Refer to the iVH Base Style documentation for the intent behind each of these.


### The Element Prop

Use the prop \`cmp\` if you would like to use a different base element for an
atom. This is supported by all atomic components.

For example, suppose you wanted a card that used a \`section\` tag instead of
the standard \`div\`:

\`\`\`javascript
<AuCard cmp='section'>
  I'm fancy and a good a11y.
</AuButton>
\`\`\`


## The Components


`

const docIt = (cmpName, baseEl, baseClass, extraProps, isSemantic, defProps, desc) => `
### ${cmpName}

> ${desc}

**Semantic props**: ${isSemantic ? 'Yes.' : 'Not supported.'}

**Additional props**: ${!extraProps.length ? 'None.' : '\n' + extraProps.map(p => '- ' + p).join('\n')}

**Default props**: ${!defProps.length ? 'None.' : '\n' + defProps.map(p => '- ' + p).join('\n')}

`

const atomsDocString = atomsConfig
  .atoms
  .sort((a, b) => a[0] < b[0] ? -1 : 1)
  .map(arr => docIt(...arr))
  .join('\n')

fs.writeFileSync(DOCS_FILE, header + atomsDocString)
