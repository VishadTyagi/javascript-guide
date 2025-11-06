import React from 'react'

const MobileToggle = React.memo(({ onClick }) => {
  return (
    <button className="mobile-toggle" onClick={onClick}>
      <i className="fas fa-bars"></i>
    </button>
  )
})

MobileToggle.displayName = 'MobileToggle'

export default MobileToggle

