import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import Sidebar from './sidebar'

// This component receives 'onProfileClick' prop to navigate to the profile page
const Header = ({ onProfileClick }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  // --- STYLES to match the new design ---
  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 0', // Padding only top/bottom, horizontal padding will be in the parent
    backgroundColor: 'transparent', // No background color
    fontFamily: "'Poppins', sans-serif",
  }

  const logoStyles = {
    fontWeight: '700',
    fontSize: '1.2rem',
    color: '#1a202c',
    marginLeft: '15px',
  }

  const iconButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  }

  const iconStyles = {
    fontSize: '1.5rem',
    color: '#4a5568',
  }

  const profileIconContainerStyles = {
    marginLeft: 'auto', // This pushes the profile icon to the far right
  }

  return (
    <>
      <header style={headerStyles}>
        <button style={iconButtonStyles} onClick={() => setSidebarOpen(true)}>
          <FiMenu style={iconStyles} />
        </button>

        <div style={logoStyles}>Campus Connect</div>

        <div style={profileIconContainerStyles}>
          <button style={iconButtonStyles} onClick={onProfileClick}>
            <FaUserCircle style={iconStyles} />
          </button>
        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}

export default Header
