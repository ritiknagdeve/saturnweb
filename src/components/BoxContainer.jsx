import React from 'react';
import ChevronLeft from '../assets/chevrons-left.svg';
import ChevronRight from '../assets/chevron-right.svg';

const BoxContainer = ({ onClick, isShifted }) => {
  return (
    <div 
      className="absolute bg-white text-primary flex flex-col items-center justify-center border border-border cursor-pointer rounded-[4px]"
      style={{ 
        width: '34px', 
        height: '34px', 
        left: '-15px', 
        top: '-17px', 
        transform: 'translateX(-50%)',
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease',
        zIndex: 10,
        boxShadow: isShifted ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = isShifted ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.05)';
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{
          width: '16px',
          height: '16px',
          transform: isShifted ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Always use the left chevron icon, just rotate it when shifted */}
        <>
          <polyline points="11 17 6 12 11 7"></polyline>
          <polyline points="18 17 13 12 18 7"></polyline>
        </>
      </svg>
    </div>
  );
};

export default BoxContainer; 