import React from 'react';
import SideOptions from './SideOptions';
import ProfilePic from '../assets/profile pic.svg';
import NeedHelpIcon from '../assets/need help.svg';

const Sidebar = ({ isShifted }) => {
  // Minimal top margin to match Figma design
  const textMarginTop = 20;
  const borderPosition = textMarginTop + 52; // Increased to accommodate more padding

  return (
    <div className="relative h-full min-h-screen bg-background flex-shrink-0">
      {/* Logo div with proper positioning matching Figma design */}
      <div style={{ marginTop: `${textMarginTop}px`, paddingLeft: '22px', paddingRight: '65px', paddingTop: '16px', paddingBottom: '28px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="68" height="12" fill="none" viewBox="0 0 68 12">
          <path fill="#000" d="M55.282 11.555q.564-.298.8-.454.234-.156.422-.439.188-.297.188-.736V2.093q0-.439-.188-.736a1.3 1.3 0 0 0-.423-.454 8 8 0 0 0-.783-.47V.15h2.6l6.752 8.49V2.094q0-.454-.203-.736a1.4 1.4 0 0 0-.502-.454 8 8 0 0 0-.783-.36 3 3 0 0 1-.298-.11V.15h4.402v.282q-.547.298-.783.454-.235.14-.423.439-.188.282-.188.705v9.885h-.642l-7.3-9.196v7.143q0 .455.188.752a1.5 1.5 0 0 0 .47.455q.282.156.767.344l.345.141v.282h-4.418zm-11.566-.009q.517-.25.768-.408a1.6 1.6 0 0 0 .454-.454q.188-.282.188-.72V2.036q0-.44-.188-.721a1.3 1.3 0 0 0-.423-.439 8 8 0 0 0-.799-.438V.157h4.559q1.629 0 2.804.689 1.19.674 1.19 2.193 0 1.019-.72 1.817-.705.8-1.739 1.16l2.6 3.806a6.1 6.1 0 0 0 1.912 1.724v.282h-1.864a1.15 1.15 0 0 1-1.019-.549l-3.086-4.793h-1.645v3.493q0 .564.282.862.282.282.893.61l.172.095v.282h-4.339zm2.992-6.032h1.254q.689 0 1.284-.266.595-.265.956-.768.36-.517.36-1.222 0-1.065-.799-1.597-.783-.533-1.895-.533h-1.16zM36.768 12q-2.224 0-3.415-1.222-1.19-1.238-1.19-3.462V2.115q0-.47-.188-.768a1.3 1.3 0 0 0-.455-.47 8 8 0 0 0-.767-.423V.172h4.417v.282q-.72.33-1.065.674-.345.33-.345.987V7.05q0 3.932 3.447 3.932 1.457 0 2.177-.909.737-.924.737-2.412V2.193q0-.532-.25-.846a1.44 1.44 0 0 0-.58-.485 9 9 0 0 0-.956-.408V.172h4.402v.282l-.25.126q-.33.172-.533.313t-.36.376q-.236.376-.236.846v5.2q0 2.226-1.19 3.463Q38.992 12 36.768 12m-14.751-.31q.673-.25.986-.391.314-.157.549-.47.25-.33.25-.846v-8.71H21.86q-.44 0-.784.235-.344.22-.548.626l-.814 1.74h-.282V.3h10.323v3.572h-.282l-.799-1.739a1.4 1.4 0 0 0-.548-.626 1.43 1.43 0 0 0-.799-.235h-1.942v8.71q0 .516.235.846.25.313.548.47.313.14.987.391v.282h-5.139zm-13.689-.144q.502-.267.925-.752c.292-.324.312-.363.673-1.019L15.49.078h1.612l.76 8.33c.076.844.231 1.714.789 2.354.142.324.476.585.852.784v.282h-4.01v-.282c.303-.115.35-.177.486-.358.141-.189.141-.43.141-.754V7.661h-4.157l-.204.5q-.626 1.395-.626 1.896 0 .502.266.893.282.392.736.596v.282H8.328zm7.792-4.857L15.866.568l-3.42 6.121zM3.603 12q-.971 0-1.582-.157-.595-.14-1.66-.532L0 11.17V8.303h.282l.204.423q.345.752.58 1.16.234.39.642.704.423.313 1.096.486.407.094.8.094 1.002 0 1.597-.517.61-.517.611-1.504 0-.8-.345-1.222a2.9 2.9 0 0 0-.83-.72A17 17 0 0 0 3.274 6.5a15 15 0 0 1-1.55-.814 3.3 3.3 0 0 1-.988-.956q-.39-.61-.391-1.503 0-.846.517-1.582.532-.752 1.363-1.19Q3.055 0 3.885 0q.878 0 1.551.204.69.188 1.535.642v2.726H6.69q-.438-1.034-.736-1.535a2.4 2.4 0 0 0-.815-.846Q4.605.846 3.744.846q-.783 0-1.284.533-.502.517-.502 1.3 0 .642.33 1.112.328.455.814.752.486.298 1.316.705.97.47 1.535.846.579.376.987 1.003.407.626.407 1.55 0 .972-.532 1.74-.533.767-1.395 1.19A4.1 4.1 0 0 1 3.603 12"></path>
        </svg>
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
        <SideOptions isShifted={isShifted} />
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
            <span 
              className="text-sm font-light text-[#7F7F7F]"
              style={{ 
                opacity: isShifted ? 0 : 1,
                transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              Rohit's Space
            </span>
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
            <span 
              className="text-sm font-light text-[#7F7F7F]"
              style={{ 
                opacity: isShifted ? 0 : 1,
                transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              Need help?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 