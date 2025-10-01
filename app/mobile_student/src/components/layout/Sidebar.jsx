// src/components/layout/Sidebar.jsx
import React from 'react'
import { FiX, FiLogOut } from 'react-icons/fi'
import { FaHistory } from 'react-icons/fa'
import { IoMdNotifications, IoMdHelpCircle } from 'react-icons/io'

const Sidebar = ({ isOpen, onClose }) => {
  // --- STYLES ---

  const sidebarStyles = {
    position: 'fixed',
    top: 0,
    left: isOpen ? '0' : '-100%', // Controls the slide-in/out effect
    width: '280px',
    height: '100%',
    backgroundColor: 'white',
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    zIndex: 1002, // Higher than the overlay
    transition: 'left 0.3s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
  }

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1001,
    display: isOpen ? 'block' : 'none', // Show only when sidebar is open
    transition: 'opacity 0.3s ease-in-out',
    opacity: isOpen ? 1 : 0,
  }

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e2e8f0',
  }

  const menuListStyles = {
    listStyle: 'none',
    padding: '20px',
    margin: 0,
    flexGrow: 1,
  }

  // --- JSX ---
  return (
    <>
      <div style={overlayStyles} onClick={onClose} />
      <nav style={sidebarStyles}>
        <div style={headerStyles}>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Menu</h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <FiX size={24} />
          </button>
        </div>
        <ul style={menuListStyles}>
          <MenuItem icon={<FaHistory />} text="My Trip History" />
          <MenuItem
            icon={<IoMdNotifications />}
            text="Notifications & Alerts"
          />
          <MenuItem icon={<IoMdHelpCircle />} text="Help & Support" />
        </ul>
        <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0' }}>
          <MenuItem icon={<FiLogOut />} text="Logout" />
        </div>
      </nav>
    </>
  )
}

// Helper component for menu items
const MenuItem = ({ icon, text }) => {
  const itemStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    cursor: 'pointer',
    color: '#2d3748',
    textDecoration: 'none',
    fontSize: '1rem',
  }

  return (
    <li>
      <a href="#" style={itemStyles}>
        <span style={{ marginRight: '15px' }}>{icon}</span>
        {text}
      </a>
    </li>
  )
}

export default Sidebar
