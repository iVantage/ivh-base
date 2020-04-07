
/**
 * Atom config properties:
 *
 * [0] The component name e.g.
 * [1] The element type (div, button, etc.)
 * [2] Required classname
 * [3] Optional classname suffixes e.g. ['sm'] --> 'au-btn-sm'
 * [4] Whether or not to use standard semantic class suffixes
 * [5] Default props
 * [6] Description
 *
 * All atoms should allow you to specify a replacement node name. I.e. you
 * should be able to use a `div` instead of a `p` tag for alerts if you choose.
 */

const fs = require('fs')
const atomsConfig = require('../atoms.json')

const semanticPropClasses = [
  'info',
  'primary',
  'success',
  'warning',
  'danger'
]

const atomTpl = (conf) => {
  const cmpName = conf[0]
  const nodeName = conf[1]
  const classes = conf[2]
  const propClasses = conf[3]
    .concat(conf[4] ? semanticPropClasses : [])
  const defProps = conf[5]

  return `

export const ${cmpName} = (props) => {
  const {
    className,${propClasses.length
    ? '\n    ' + propClasses.join(`,\n    `) + ','
    : ''}
    ...passThroughProps
  } = props

  const _className = [
    className,
    '${classes.join(`',\n    '`)}',
    ${propClasses.map(c =>
    `${c} && '${classes[0]}-${c}'`
  ).join(`,\n    `) || '0'}
  ]
  .filter(Boolean).join(' ')

  const Cmp = props.cmp || '${nodeName}'

  return <Cmp
    className={_className}${
  defProps.length
    ? '\n    ' + defProps.join('\n    ') : ''}
    {...passThroughProps} />
}`
}

// Clean the existing js files
fs.readdirSync('src/atoms')
  .filter(f => /\.js$/.test(f))
  .forEach(f => fs.unlinkSync(`src/atoms/${f}`))

// Write the individual atom files
const atomGuts = `
/**
 * Do not edit this file directly.
 *
 * The file is automatically generated as part of the ivh-base-components
 * library. Changes made here will be overwritten.
 */

import React from 'react'` + atomsConfig.atoms.map(atomTpl).join('') + '\n'

fs.writeFileSync('src/atoms/index.js', atomGuts)