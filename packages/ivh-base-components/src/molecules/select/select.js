import React, { Component } from 'react'
import AuSelectContext from './select-context'
import PropTypes from 'prop-types'
import './select.css'

const SELECTOR_FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * An incremented value we'll use to uniquely identify select instances
 */
let auSelectId = 0

/**
 * We should only have one select menu open at a time
 */
const closeQueue = []

class AuSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: !!props.isOpen, // defaults to false
      focusIndex: -1
    }

    this.toggle = this._toggle.bind(this)
    this.handleKeyDown = this._handleKeyDown.bind(this)
    this.setFocusIndex = this._setFocusIndex.bind(this)
    this.selectFocusItem = this._selectFocusItem.bind(this)
    this.scrollFocusItemIntoView = this._scrollFocusItemIntoView.bind(this)
    this.handleBlur = this._handleBlur.bind(this)
    this.focusFirstFocusable = this._focusFirstFocusable.bind(this)
    this.handleBodyClick = this._handleBodyClick.bind(this)

    this._identifier = auSelectId++

    // Used for accessing menu items
    this.menuEl = null
  }

  /**
   * We require a focusable element to facilitate toggling.
   *
   * Also it's just good a11y practice.
   */
  componentDidMount () {
    if (!this.containerEl) {
      return
    }
    const focusables = this.containerEl.querySelectorAll(SELECTOR_FOCUSABLE)
    if (!focusables.length) {
      console.error(
        new Error('AuSelect must be have a focusable element as its button.'),
        this.containerEl
      )
    }
  }

  componentDidUpdate (_, prevState) {
    const wasOpen = prevState.isOpen
    const { isOpen } = this.state
    if (isOpen !== wasOpen) {
      if (isOpen) {
        this.props.onOpen()
        this.focusFirstFocusable()
        document.body.addEventListener('mousedown', this.handleBodyClick)
      } else {
        this.props.onClose()
        document.body.removeEventListener('mousedown', this.handleBodyClick)
      }
    }
  }

  _toggle () {
    if (this.props.disabled || this.props.hasOwnProperty('isOpen')) {
      // In a controlled state the caller will determine whether we are open or
      // closed
      return
    }

    const nextIsOpen = !this.state.isOpen

    /**
     * Close other menus when opening this one
     */
    if (nextIsOpen) {
      closeQueue.forEach(receipt => {
        const [id, cb] = receipt
        if (id !== this._identifier) {
          cb()
        }
      })
      closeQueue.length = 0
      closeQueue.push([
        this._identifier,
        () => {
          if (this.state.isOpen) {
            this.toggle()
          }
        }
      ])
    }

    this.setState({
      isOpen: nextIsOpen,
      focusIndex: -1
    })
  }

  /**
   * As a "managed input" we won't have a chance to reset focus in response to
   * our own toggling
   */
  UNSAFE_componentWillReceiveProps ({ isOpen }) {
    if (isOpen !== this.props.isOpen) {
      this.setState({
        focusIndex: -1,
        isOpen
      })
    }
  }

  _handleKeyDown (event) {
    const { isOpen, focusIndex } = this.state
    switch (event.key) {
      case 'Escape':
        if (isOpen) {
          this.toggle()
        }
        break

      case 'Enter':
        if (isOpen) {
          this.selectFocusItem()
        } else {
          this.toggle()
        }
        break

      case 'ArrowDown':
        if (isOpen) {
          this.setFocusIndex(focusIndex + 1)
        } else {
          this.toggle()
        }
        break

      case 'ArrowUp':
        if (isOpen) {
          this.setFocusIndex(focusIndex - 1)
        } else {
          this.toggle()
        }
        break

      default:
        // No need to stop event propagation
        if (!isOpen) {
          if (this.props.kind === 'typeahead') {
            this.toggle()
          }
        }
        return
    }
    event.preventDefault()
    event.stopPropagation()
  }

  _handleBlur () {
    if (
      this.state.isOpen &&
      this.containerEl &&
      !this.containerEl.contains(document.activeElement)
    ) {
      const hoverEls = document.querySelectorAll(':hover')
      // Since the menu is rendered in a portal we can't just check that the
      // containerEl contains one of the hovered elements. As long as there
      // isn't more than one menu open at a time (there shouldn't be
      // :fingers-crossed: this should be ok.
      const isMouseInSelect = Array.prototype.slice
        .call(hoverEls)
        .map(el => el.classList.contains('AuSelectMenu'))
        .reduce((val, acc) => val || acc, false)
      if (!isMouseInSelect) {
        this.toggle()
      }
      // Note you can be sneaky and still move the focus underneath these
      // checks. We'll fall back to listening for body clicks.
    }
  }

  /**
   * A fallback for blurs
   */
  _handleBodyClick (event) {
    if (this.state.isOpen) {
      // Will be handled by the regular click handler
      if (this.containerEl && this.containerEl.contains(event.target)) {
        return
      }

      // Clicks inside the menu don't need to trigger a toggle
      let node = event.target
      while (node && node.classList) {
        if (node.classList.contains('AuSelectMenu')) {
          return
        }
        node = node.parentNode
      }

      this.toggle()
    }
  }

  _focusFirstFocusable () {
    // The timeout here is to allow the current call stack and event propagation
    // chain to clear. Otherwise some browsers (*caugh* Firefox *caugh*) get
    // confused and just keep the focus on the body.
    setTimeout(() => {
      const firstFocusable = this.containerEl.querySelectorAll(
        SELECTOR_FOCUSABLE
      )[0]

      if (firstFocusable) {
        firstFocusable.focus()
      }
    })
  }

  _setFocusIndex (focusIndex) {
    // Without a menu element... wat?
    if (!this.menuEl) {
      return
    }

    const menuItems = this.menuEl.getElementsByClassName('AuSelectMenuItem')

    // No menu items? No keyboard nav.
    if (!menuItems.length) {
      return
    }

    focusIndex = Math.max(focusIndex, 0)
    focusIndex = Math.min(focusIndex, menuItems.length - 1)
    this.setState({ focusIndex }, this.scrollFocusItemIntoView)
  }

  _selectFocusItem () {
    if (!this.menuEl) {
      return
    }
    const menuItems = this.menuEl.getElementsByClassName('AuSelectMenuItem')
    if (!menuItems.length) {
      return
    }
    const { focusIndex } = this.state
    const theItem = focusIndex === -1 ? menuItems[0] : menuItems[focusIndex]
    // If the item has a link in it, just follow the link
    const theItemLink = theItem.querySelectorAll('a')[0]
    if (theItemLink) {
      theItemLink.click()
    } else {
      theItem.click()
    }
  }

  _scrollFocusItemIntoView () {
    if (!this.menuEl) {
      return
    }
    const menuItems = this.menuEl.getElementsByClassName('AuSelectMenuItem')
    if (!menuItems.length) {
      return
    }
    const { focusIndex } = this.state
    const showMeEl = focusIndex > -1 ? menuItems[focusIndex] : menuItems[0]
    const viewportRect = this.menuEl.getBoundingClientRect()
    const elRect = showMeEl.getBoundingClientRect()
    const elRectMidPoint = (elRect.top + elRect.bottom) / 2
    if (
      viewportRect.bottom < elRectMidPoint ||
      viewportRect.top > elRectMidPoint
    ) {
      showMeEl.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  render () {
    const className = [
      'AuSelect',
      'au-dropdown',
      this.state.isOpen && 'au-dropdown-open',
      this.props.className
    ]
      .filter(Boolean)
      .join(' ')

    const ctx = {
      getContainerEl: () => this.containerEl,
      getIsOpen: () => this.state.isOpen,
      getFocusIndex: () => this.state.focusIndex,
      registerMenuEl: el => {
        this.menuEl = el
      },
      unRegisterMenuEl: () => {
        this.menuEl = null
      },
      toggle: this.toggle,
      kind: this.props.kind
    }

    return (
      <AuSelectContext.Provider value={ctx}>
        <div
          className={className}
          style={this.props.style}
          ref={el => {
            this.containerEl = el
          }}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
        >
          {this.props.children}
        </div>
      </AuSelectContext.Provider>
    )
  }
}

AuSelect.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  style: PropTypes.object,
  kind: PropTypes.oneOf(['dropdown', 'typeahead'])
}

AuSelect.defaultProps = {
  className: '',
  onOpen: () => {},
  onClose: () => {},
  style: {},
  kind: 'dropdown'
}

export default AuSelect
