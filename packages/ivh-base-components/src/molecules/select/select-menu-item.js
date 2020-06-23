import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AuListItem } from '../../atoms'
import AuSelectContext from './select-context'
import theme from '@ivantagehealth/ivh-base-style'

const AuSelectMenuItemHOC = Cmp => {
  class MenuItem extends Component {
    constructor (props) {
      super(props)
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {
      if (this.props.isToggle) {
        this.context.toggle()
      }
      this.props.onClick.apply(null, Array.prototype.slice.apply(arguments))
    }

    render () {
      const {
        children,
        isToggle,
        onClick, // Clobbering passed onClick
        className,
        ...rest
      } = this.props

      const cls = ['AuSelectMenuItem', className].filter(Boolean).join(' ')

      return (
        <Cmp className={cls} onClick={this.handleClick} {...rest}>
          {children}
        </Cmp>
      )
    }
  }

  MenuItem.contextType = AuSelectContext

  MenuItem.propTypes = {
    children: PropTypes.any,
    isToggle: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string
  }

  MenuItem.defaultProps = {
    isToggle: true,
    onClick: () => {}
  }

  return MenuItem
}

/**
 * A special case for links in an au-list
 */
let AuSelectMenuItemLink = ({ href, children, ...props }) => {
  return (
    <li style={{ padding: 0 }}>
      <AuListItem
        href={href}
        {...props}
        cmp='a'
        style={{
          display: 'block',
          cursor: 'pointer',
          textDecoration: 'none',
          color: theme.colorText
        }}
      >
        {children}
      </AuListItem>
    </li>
  )
}

AuSelectMenuItemLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any
}

AuSelectMenuItemLink = AuSelectMenuItemHOC(AuSelectMenuItemLink)

const AuSelectMenuItem = AuSelectMenuItemHOC('div')
AuSelectMenuItem.HOC = AuSelectMenuItemHOC
AuSelectMenuItem.Link = AuSelectMenuItemLink
export default AuSelectMenuItem
export { AuSelectMenuItemLink }
