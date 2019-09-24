import React from 'react'
import renderer from 'react-test-renderer'
import { AuLoadingMask } from '../dist/ivh-base-components'

test('AuLoadingMask should render consistently', () => {
  const tree = renderer
    .create(
      <AuLoadingMask>
        Please wait, the bears are waking from hibernation...
      </AuLoadingMask>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
