import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AuListItem } from '@ivantagehealth/ivh-base-components'
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

  MenuItem.contextTypes = {
    toggle: PropTypes.func
  }

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
const AuSelectMenuItemLink = ({ href, children, ...props }) => (
  <li style={{ padding: 0 }}>
    <AuListItem
      href={href}
      {...props}
      cmp='a'
      style={{
        display: 'block',
        textDecoration: 'none',
        color: theme.colorText
      }}
    >
      {children}
    </AuListItem>
  </li>
)

AuSelectMenuItemLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any
}

const AuSelectMenuItem = AuSelectMenuItemHOC('div')
AuSelectMenuItem.HOC = AuSelectMenuItemHOC
AuSelectMenuItem.Link = AuSelectMenuItemHOC(AuSelectMenuItemLink)
export default AuSelectMenuItem
