
import React from 'react'

const AuSelectContext = React.createContext({
  getContainerEl: () => {},
  getIsOpen: () => {},
  getFocusIndex: () => {},
  registerMenuEl: () => {},
  toggle: () => {},
  kind: 'dropdown'
})

AuSelectContext.displayName = 'AuSelectContext'

export default AuSelectContext
