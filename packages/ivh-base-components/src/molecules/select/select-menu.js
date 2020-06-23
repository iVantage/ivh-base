import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AuSelectContext from './select-context'
import theme from '@ivantagehealth/ivh-base-style'

class AuSelectMenu extends Component {
  constructor (props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount () {
    document.body.appendChild(this.el)
    this.context.registerMenuEl(this.el)
  }

  componentWillUnmount () {
    this.context.unRegisterMenuEl(this.el)
    document.body.removeChild(this.el)
  }

  render () {
    const { children } = this.props
    const { getContainerEl, getIsOpen, getFocusIndex } = this.context

    const el = getContainerEl()
    if (!el) {
      return null
    }

    const rect = getContainerEl().getBoundingClientRect()
    const { clientWidth } = document.body
    let { right } = this.props

    if (right === null) {
      // If right is not specified as true/false explicitly then try to make a
      // reasonable guess based on where we are on the page
      if (
        clientWidth > 800 &&
        clientWidth - (rect.left - window.pageXOffset) < 400
      ) {
        right = true
      }
    }

    // Refer - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollX
    // pageXOffset and pageYoffset are aliases of scrollX and scrollY
    // and are used for cross browser compatibility.
    const style = right
      ? { left: 'auto', right: clientWidth - rect.right + window.pageXOffset }
      : { left: rect.left + window.pageXOffset }
    style.top = rect.bottom + window.pageYOffset

    const className = [
      'au-dropdown-menu',
      getIsOpen() && 'au-dropdown-menu-open',
      this.props.className
    ]
      .filter(Boolean)
      .join(' ')

    return ReactDOM.createPortal(
      <div className={className} style={{ ...this.props.style, ...style }}>
        <div className='AuSelectMenu'>
          {children}

          {/* Oh dear... */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .AuSelectMenu .AuSelectMenuItem:nth-child(${getFocusIndex() + 1}) {
              background-color: ${theme.colorSelectionBlue};
            }
          `
            }}
          />
        </div>
      </div>,
      this.el
    )
  }
}

AuSelectMenu.contextType = AuSelectContext

AuSelectMenu.defaultProps = {
  // Use this prop to the menu to the bottom right corner of the button rather
  // than the bottom left
  right: null,
  className: undefined,
  style: {}
}

export default AuSelectMenu
