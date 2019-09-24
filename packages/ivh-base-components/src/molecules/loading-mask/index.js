
import React from 'react'

export default ({children}) => (
  <div className='au-mask'>
    <div className='au-mask-spinner'>
      <span className='au-spinner-dot' />
      <span className='au-spinner-dot' />
      <span className='au-spinner-dot' />
    </div>
    {children}
  </div>
)
