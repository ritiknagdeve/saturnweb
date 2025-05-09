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
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 10
      }}
      onClick={onClick}
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
        className={`w-4 h-4 transition-transform duration-300 ${isShifted ? 'rotate-180' : ''}`}
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