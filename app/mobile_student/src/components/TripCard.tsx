// src/components/TripCard.jsx
import React from 'react'

// This component will receive trip data as props
const TripCard = ({ time, availableSeats, totalSeats, status }) => {
  const cardStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const detailsStyles = {
    textAlign: 'left',
  }

  const timeStyles = {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '5px',
  }

  const seatsStyles = {
    fontSize: '0.9rem',
    color: '#718096',
  }

  const bookButtonStyles = {
    padding: '10px 20px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'white',
    backgroundColor: status === 'Booking Open' ? '#007bff' : '#6c757d', // Blue if open, gray otherwise
    border: 'none',
    borderRadius: '8px',
    cursor: status === 'Booking Open' ? 'pointer' : 'not-allowed', // Change cursor based on status
  }

  return (
    <div style={cardStyles}>
      <div style={detailsStyles}>
        <div style={timeStyles}>{time}</div>
        <div
          style={seatsStyles}
        >{`${availableSeats} / ${totalSeats} seats available`}</div>
      </div>
      <button style={bookButtonStyles} disabled={status !== 'Booking Open'}>
        Book Seat
      </button>
    </div>
  )
}

export default TripCard
