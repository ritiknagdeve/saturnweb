import React from 'react';
// Import your custom calendar SVG
import CalendarIcon from '../assets/calendar.svg';

const DateDisplay = () => {
  return (
    <div className="meeting-tag">
      {/* Use the imported SVG instead of the inline SVG */}
      <img src={CalendarIcon} alt="Calendar" className="h-4 w-4" />
      <span>Today</span>
    </div>
  );
};

export default DateDisplay; 