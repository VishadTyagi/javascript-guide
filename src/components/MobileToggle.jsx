import React from 'react'

const MobileToggle = ({ onClick }) => {
  return (
    <button 
      className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-brand-500 text-white rounded-lg shadow-lg flex items-center justify-center hover:bg-brand-600 transition-colors"
      onClick={onClick}
    >
      <i className="fas fa-bars"></i>
    </button>
  )
}

export default MobileToggle
