import React from 'react';
import ScrollTextIcon from '../assets/scroll-text.svg';
import ClipboardCheckIcon from '../assets/clipboard-check.svg';

const SideOptions = ({ isShifted }) => {
  // Menu items with icons and text
  const menuItems = [
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>, 
      text: 'Search', 
      classes: 'side-nav-item'
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>, 
      text: 'Home', 
      classes: 'side-nav-item' 
    },
    { 
      icon: <img src={ScrollTextIcon} alt="" className="w-4 h-4" />, 
      text: 'Meetings notes', 
      classes: 'side-nav-item-selected' 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>, 
      text: 'Clients', 
      classes: 'side-nav-item' 
    },
    { 
      icon: <img src={ClipboardCheckIcon} alt="" className="w-4 h-4" />, 
      text: 'Tasks', 
      classes: 'side-nav-item' 
    },
  ];

  return (
    <div className="flex flex-col py-1 gap-1 mt-6">
      {menuItems.map((item, index) => (
        <div 
          key={index} 
          className={`${item.classes} px-[10px] py-2`}
        >
          <span className="text-current">{item.icon}</span>
          <span 
            className="text-sm font-light" 
            style={{ 
              opacity: isShifted ? 0 : 1,
              transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SideOptions; 