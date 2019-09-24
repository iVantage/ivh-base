import React from 'react'
import renderer from 'react-test-renderer'
import {
  AuSelect,
  AuSelectButton,
  AuSelectMenu,
  AuSelectMenuItem
} from '../dist/ivh-base-components'

test.only('AuSelect should render consistently', () => {
  const tree = renderer
    .create(
      <AuSelect>
        <AuSelectButton>
          <button onClick={() => {}}>Toggle</button>
        </AuSelectButton>
        <AuSelectMenu>
          <AuSelectMenuItem onClick={() => {}}>Clicky 1</AuSelectMenuItem>
          <AuSelectMenuItem.Link href='https://example.com'>
            Clicky 2
          </AuSelectMenuItem.Link>
        </AuSelectMenu>
      </AuSelect>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
