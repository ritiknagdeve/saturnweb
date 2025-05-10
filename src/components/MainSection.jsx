import React, { useEffect, useState, useRef } from 'react';
import Overview from './Overview';
import SummarySection from './SummarySection';
import BoxContainer from './BoxContainer';
import BackButton from './BackButton';
import MeetingHeader from './MeetingHeader';
import { useTranscription } from '../context/TranscriptionContext';
import SummaryOverview from './SummaryOverview';
import TranscriptionWrapper from './TranscriptionWrapper';

const MainSection = ({ onToggleShift }) => {
  // Get transcription context to check if it's visible
  const { isTranscriptVisible } = useTranscription();
  
  // State for the sliding behavior
  const [isSlideLeft, setIsSlideLeft] = useState(false);
  const slideAmount = '110px';
  
  // Responsive breakpoints - updated for better responsive design
  const COLLAPSE_BREAKPOINT = 1512; // Breakpoint for showing full overview vs icon
  const TABLET_BREAKPOINT = 1024; // Tablet breakpoint
  const MOBILE_BREAKPOINT = 768; // Mobile breakpoint
  const DESKTOP_BREAKPOINT = 1280; // Regular desktop breakpoint
  
  // Get initial screen size state
  const isInitiallyMobileScreen = window.innerWidth < MOBILE_BREAKPOINT;
  const isInitiallyTabletScreen = window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT;
  const isInitiallyCollapsed = window.innerWidth < COLLAPSE_BREAKPOINT;
  
  // Update constants to match the current Sidebar component values
  const sidebarTextMarginTop = 20;
  const sidebarBorderPosition = sidebarTextMarginTop + 52;
  
  // Calculate spacer height to ensure alignment with sidebar's border
  const [spacerHeight, setSpacerHeight] = useState(sidebarBorderPosition - 17); // Adjusted to align with the border
  const [isMobileScreen, setIsMobileScreen] = useState(isInitiallyMobileScreen);
  const [isTabletScreen, setIsTabletScreen] = useState(isInitiallyTabletScreen);
  const [isCollapsedLayout, setIsCollapsedLayout] = useState(isInitiallyCollapsed);
  const [isDesktopScreen, setIsDesktopScreen] = useState(window.innerWidth >= DESKTOP_BREAKPOINT);
  const [isOverviewVisible, setIsOverviewVisible] = useState(!isInitiallyCollapsed);
  const [activeSection, setActiveSection] = useState(0);
  const [manuallySelectedSection, setManuallySelectedSection] = useState(0);
  const [enableViewportTracking, setEnableViewportTracking] = useState(true);

  // Handle the box container click to toggle sliding
  const handleBoxContainerClick = () => {
    const newSlideState = !isSlideLeft;
    setIsSlideLeft(newSlideState);
    // Call the onToggleShift callback with the new state
    if (onToggleShift) {
      onToggleShift(newSlideState);
    }
    console.log("Toggling slide state:", newSlideState);
  };

  // Handle active section change from viewport tracking
  const handleActiveSectionChange = (sectionIndex) => {
    if (enableViewportTracking) {
      console.log(`MainSection: Setting active section to ${sectionIndex}`);
      setActiveSection(sectionIndex);
    }
  };

  // Handle manual section selection from Overview
  const handleSectionSelect = (sectionIndex) => {
    console.log(`MainSection: Manual selection of section ${sectionIndex}`);
    setActiveSection(sectionIndex);
    setManuallySelectedSection(sectionIndex);
    setEnableViewportTracking(false);
    
    // Re-enable viewport tracking after a delay of 3 seconds
    // This allows the user to scroll and read content before viewport tracking takes over again
    setTimeout(() => {
      setEnableViewportTracking(true);
    }, 3000);
    
    // On collapsed layout, close the overview after selection
    if (isCollapsedLayout) {
      setIsOverviewVisible(false);
    }
  };

  // Log when active section changes
  useEffect(() => {
    console.log(`MainSection: Active section is now ${activeSection}`);
  }, [activeSection]);

  // Toggle overview visibility on collapsed layout
  const toggleOverviewVisibility = () => {
    if (isCollapsedLayout) {
      setIsOverviewVisible(!isOverviewVisible);
      // When showing Overview, temporarily disable viewport tracking
      if (!isOverviewVisible) {
        setEnableViewportTracking(false);
        // Re-enable after Overview is closed or after a timeout
        setTimeout(() => {
          if (!isOverviewVisible) {
            setEnableViewportTracking(true);
          }
        }, 500);
      }
    }
  };

  // Handle save button click
  const handleSaveClick = () => {
    console.log("Saving document...");
  };

  // Check screen width and set display mode accordingly
  useEffect(() => {
    const handleResize = () => {
      // Update to use correct calculation for the spacer
      setSpacerHeight(sidebarBorderPosition - 17);

      // Check screen sizes
      const screenWidth = window.innerWidth;
      const mobileScreen = screenWidth < MOBILE_BREAKPOINT;
      const tabletScreen = screenWidth >= MOBILE_BREAKPOINT && screenWidth < TABLET_BREAKPOINT;
      const collapsedLayout = screenWidth < COLLAPSE_BREAKPOINT;
      const desktopScreen = screenWidth >= DESKTOP_BREAKPOINT;
      
      setIsMobileScreen(mobileScreen);
      setIsTabletScreen(tabletScreen);
      setIsCollapsedLayout(collapsedLayout);
      setIsDesktopScreen(desktopScreen);
      
      // Set overview visibility based on screen size
      // For screens >= COLLAPSE_BREAKPOINT: always show overview
      // For screens < COLLAPSE_BREAKPOINT: hide overview by default (unless mobile)
      if (screenWidth >= COLLAPSE_BREAKPOINT) {
        setIsOverviewVisible(true);
      } else if (collapsedLayout && isOverviewVisible && !mobileScreen) {
        setIsOverviewVisible(false);
      }
    };

    // Initial check
    handleResize();

    // Add listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [isOverviewVisible]);

  // Sample data for participants
  const participants = ["Smith", "Marek"];
  const meetingTitle = "Onboarding Call with Smith & Marek";
  const meetingType = "Onboarding";

  return (
    <div 
      className={`flex-1 h-full border border-border bg-white flex flex-col relative rounded-tl-[16px] rounded-tr-[16px] ${isTranscriptVisible ? 'transcription-open' : ''}`}
      style={{ 
        marginTop: '16px',
        marginRight: '16px',
        marginLeft: isSlideLeft ? `-${slideAmount}` : '0',
        width: isSlideLeft ? `calc(100% + ${slideAmount})` : '100%',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {/* Spacer to position correctly - height dynamically calculated */}
      <div style={{ height: `${spacerHeight}px`, marginTop: '-16px' }}></div>
      
      {/* First inner div - centered with respect to the horizontal border in sidebar */}
      <div 
        className="h-[34px] mr-2 flex items-center"
        style={{ position: 'relative', paddingLeft: '4rem' }}
      >
        {/* Wrapper for the blue box */}
        <div className="relative" style={{ width: '34px', position: 'absolute', left: '1rem' }}>
          <BoxContainer onClick={handleBoxContainerClick} isShifted={isSlideLeft} />
        </div>
        
        {/* Back to home text - positioned exactly */}
        <BackButton />
        
        {/* Visual indicator to show alignment */}
        <div className="absolute -left-[16px] w-[6px] h-[2px] bg-gray-500"></div>
      </div>
      
      {/* Second inner div - header components */}
      <MeetingHeader
        onSaveClick={handleSaveClick}
        participants={participants}
        meetingTitle={meetingTitle}
        meetingType={meetingType}
      />
      
      {/* Third inner div - contains the three components */}
      <div className="flex-1 border-t border-gray-200 mt-[12px] overflow-hidden">
        <div className="h-full flex flex-row justify-between bg-background">
          {/* Summary Overview area */}
          <SummaryOverview
            isOverviewVisible={isOverviewVisible}
            isCollapsedLayout={isCollapsedLayout}
            activeSection={activeSection}
            onSectionSelect={handleSectionSelect}
            toggleOverviewVisibility={toggleOverviewVisibility}
          />
          
          {/* SummarySection - takes remaining space */}
          <div className={`${isOverviewVisible && isCollapsedLayout ? 'hidden' : 'flex-1'} overflow-auto`}>
            <div className="w-full h-full flex justify-center">
              <div 
                className={`w-full mx-auto px-4 lg:px-6 py-4 summary-content ${isTabletScreen ? 'tablet-view' : ''}`}
                style={{
                  paddingLeft: isSlideLeft ? '32px' : '16px',
                  paddingRight: isSlideLeft ? '32px' : '16px',
                  maxWidth: isSlideLeft ? '1100px' : '960px',
                  transition: 'padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), max-width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <SummarySection onActiveSectionChange={handleActiveSectionChange} />
              </div>
            </div>
          </div>
          
          {/* MeetingTranscript - right side, now always visible but with dynamic width */}
          <div className={`flex-shrink-0 ${isMobileScreen ? 'fixed mobile-fixed-bottom mobile-fixed-bottom-right' : 'hidden lg:block'}`} 
               style={{ width: 'auto', maxWidth: isDesktopScreen ? '320px' : isTabletScreen ? '280px' : 'calc(100vw - 32px)' }}>
            <div className="h-full flex items-start pt-8">
              <TranscriptionWrapper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection; 