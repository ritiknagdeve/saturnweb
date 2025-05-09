import React from 'react';
import SideOptions from './SideOptions';
import SaturnLogo from '../assets/SATURN.svg';
import ProfilePic from '../assets/profile pic.svg';
import NeedHelpIcon from '../assets/need help.svg';

const Sidebar = () => {
  // Minimal top margin to match Figma design
  const textMarginTop = 20;
  const borderPosition = textMarginTop + 52; // Increased to accommodate more padding

  return (
    <div className="relative w-[152px] h-full min-h-screen bg-background flex-shrink-0">
      {/* Logo div with proper positioning matching Figma design */}
      <div style={{ marginTop: `${textMarginTop}px`, paddingLeft: '22px', paddingRight: '65px', paddingTop: '16px', paddingBottom: '28px' }}>
        <img src={SaturnLogo} alt="Saturn" className="h-[12px] w-auto" />
      </div>
      
      {/* Horizontal border positioned below the text div */}
      <div 
        className="absolute left-0 w-full border-t border-border" 
        style={{ top: `${borderPosition}px` }}
      ></div>
      
      {/* SideOptions component - positioned below the top border */}
      <div 
        className="absolute left-2 w-full" 
        style={{ top: `${borderPosition}px` }}
      >
        <SideOptions />
      </div>
      
      {/* Bottom section with properly spaced items */}
      <div 
        className="absolute left-0 w-full bg-background" 
        style={{ bottom: '0px' }}
      >
        <div className="flex flex-col">
          {/* Rohit's Space with icon */}
          <div className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer text-base">
            <div className="flex-shrink-0 mr-2">
              <img src={ProfilePic} alt="" className="w-4 h-4 rounded-full" />
            </div>
            <span className="text-sm font-light text-[#7F7F7F]">Rohit's Space</span>
          </div>
          
          {/* Border separator with proper spacing */}
          <div className="my-1">
          <div className="mx-[-16px] w-[184px] border-t border-[#E8E8E8]"></div>
          </div>
          
          {/* Need help with icon */}
          <div className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer text-base">
            <div className="flex-shrink-0 mr-2">
              <img src={NeedHelpIcon} alt="" className="w-4 h-4" />
            </div>
            <span className="text-sm font-light text-[#7F7F7F]">Need help?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 