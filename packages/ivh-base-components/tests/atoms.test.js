/**
 * Our atoms don't really have any moving parts. Let's just make sure they
 * actually build.
 */

import React from 'react'
import config from '../atoms.json'
import renderer from 'react-test-renderer'
import * as IvhBaseLibrary from '../dist/ivh-base-components'

test('The config should have atoms', () => {
  expect(config.atoms.length).toBeGreaterThan(0)
})

describe('Its a party, all The atoms are there', () => {
  config.atoms.forEach(atomConfig => {
    const name = atomConfig[0]
    test(`The ${name} atom`, () => {
      const El = IvhBaseLibrary[name]
      const tree = renderer.create(<El />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
