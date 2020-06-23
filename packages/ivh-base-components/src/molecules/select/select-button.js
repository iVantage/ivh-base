import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AuSelectContext from './select-context'

const noop = () => {}

// Check for IE
const isGarbageBrowser = !!document.documentMode

class SelectButton extends Component {
  getStyle () {
    if (isGarbageBrowser) {
      return { display: 'inherit', marginBottom: '-4px' }
    }
    return { display: 'inherit' }
  }

  render () {
    const { kind, toggle } = this.context

    const handleClick = kind === 'dropdown' ? toggle : noop
    const handleFocus = kind === 'typeahead' ? toggle : noop

    return (
      <div
        className='au-dropdown-button'
        style={this.getStyle()}
        onClick={handleClick}
        onFocus={handleFocus}
      >
        {this.props.children}
      </div>
    )
  }
}

SelectButton.propTypes = {
  children: PropTypes.any
}

SelectButton.contextType = AuSelectContext

export default SelectButton
