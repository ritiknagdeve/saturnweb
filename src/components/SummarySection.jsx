import React, { useEffect, useState, useRef } from 'react';
import mockData from '../data/mockData.json';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import FactItem from './FactItem';
import SectionBlock from './SectionBlock';
import { v4 as uuidv4 } from 'uuid';
import sparklesIcon from '../assets/sparkles.svg';

function SummarySection({ onActiveSectionChange }) {
  const [sections, setSections] = useState([]);
  const scrollContainerRef = useRef(null);
  const [visibleSectionIndex, setVisibleSectionIndex] = useState(-1);
  const sectionRefs = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerRef = useRef(null);
  // Store the width of the dragged item
  const [draggedItemWidth, setDraggedItemWidth] = useState(null);

  useEffect(() => {
    // Process the mock data to organize by sections
    if (mockData && mockData.sections) {
      // Add unique id to each fact if missing
      let factIdCounter = 1;
      const sectionsWithIds = mockData.sections.map(section => ({
        ...section,
        sections: section.sections.map(subSection => ({
          ...subSection,
          unstructured_facts: subSection.unstructured_facts.map(fact => {
            if (typeof fact === 'object' && fact.id) return fact;
            if (typeof fact === 'object') return { ...fact, id: uuidv4() };
            return { content: fact, id: uuidv4() };
          })
        }))
      }));
      setSections(sectionsWithIds);
      // Initialize section refs array
      sectionRefs.current = Array(mockData.sections.length).fill().map(() => React.createRef());
      
      // Delay the loaded state to prevent layout shifts
      setTimeout(() => {
        setIsLoaded(true);
        
        // Set first section as active initially
        setVisibleSectionIndex(0);
        if (onActiveSectionChange) {
          onActiveSectionChange(0);
        }
      }, 100);
    }
  }, []);

  // Set up intersection observer to track visible sections
  useEffect(() => {
    if (!sections.length || !scrollContainerRef.current || !isLoaded) return;

    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options = {
      root: scrollContainerRef.current,
      rootMargin: '-5% 0px -40% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Sort entries by their intersection ratio (higher values first)
      const sortedEntries = [...entries].sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      
      // Use the entry with the highest intersection ratio
      const mostVisibleEntry = sortedEntries[0];
      
      if (mostVisibleEntry && mostVisibleEntry.isIntersecting) {
        const id = mostVisibleEntry.target.id;
          const index = parseInt(id.split('-')[1]);
        
        // Special handling for last section (Risks section)
        const isLastSection = index === sections.length - 1;
        
        // Use a lower threshold for the last section to make it more easily detectable
        if (!isNaN(index) && (index !== visibleSectionIndex || 
            (isLastSection && mostVisibleEntry.intersectionRatio > 0.1))) {
          console.log(`Section ${index} is now visible with ratio: ${mostVisibleEntry.intersectionRatio}`);
          setVisibleSectionIndex(index);
          if (onActiveSectionChange) {
            onActiveSectionChange(index);
          }
        }
      }
    }, options);

    // Observe all section elements
    const sectionElements = document.querySelectorAll('[id^="section-"]');
    sectionElements.forEach(section => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, onActiveSectionChange, isLoaded]);

  const handleEditItem = (sectionIndex, subSectionIndex, factId, newContent) => {
    const newSections = JSON.parse(JSON.stringify(sections));
    const facts = newSections[sectionIndex].sections[subSectionIndex].unstructured_facts;
    const idx = facts.findIndex(f => f.id === factId);
    if (idx !== -1) {
      if (typeof facts[idx] === 'object') {
        facts[idx].content = newContent;
      } else {
        facts[idx] = newContent;
      }
    }
    setSections(newSections);
  };

  const handleDeleteItem = (sectionIndex, subSectionIndex, factId) => {
    const newSections = JSON.parse(JSON.stringify(sections));
    const facts = newSections[sectionIndex].sections[subSectionIndex].unstructured_facts;
    const idx = facts.findIndex(f => f.id === factId);
    if (idx !== -1) {
      facts.splice(idx, 1);
    }
    setSections(newSections);
  };

  // On drag start, measure the width of the dragged item
  const handleBeforeCapture = (before) => {
    const { draggableId } = before;
    // Use the data attribute to select the card
    const el = document.querySelector(`[data-fact-card='${draggableId}']`);
    if (el) {
      const rect = el.getBoundingClientRect();
      setDraggedItemWidth(rect.width);
    }
  };

  // On drag end, clear the width
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    
    // If dropped outside any droppable area
    if (!destination) return;
    
    // Extract indexes from droppableIds
    const sourceIds = source.droppableId.split('-');
    const destinationIds = destination.droppableId.split('-');
    
    const sourceSectionIndex = parseInt(sourceIds[1]);
    const sourceSubSectionIndex = parseInt(sourceIds[2]);
    const destinationSectionIndex = parseInt(destinationIds[1]);
    const destinationSubSectionIndex = parseInt(destinationIds[2]);
    
    // Create a deep copy of sections to modify
    const newSections = JSON.parse(JSON.stringify(sections));
    
    // Get source facts
    const sourceFacts = newSections[sourceSectionIndex].sections[sourceSubSectionIndex].unstructured_facts;
    
    // Get the fact being moved
    const [movedFact] = sourceFacts.splice(source.index, 1);
    
    // Insert into destination
    newSections[destinationSectionIndex].sections[destinationSubSectionIndex].unstructured_facts.splice(
      destination.index, 
        0, 
        movedFact
      );
      
    // Update state
    setSections(newSections);
    setDraggedItemWidth(null);
  };

  // Simple function to scroll to a section when clicked
  const handleSectionClick = (sectionIndex) => {
    const sectionElement = document.getElementById(`section-${sectionIndex}`);
    if (sectionElement && scrollContainerRef.current) {
      // Get the element's position relative to the scroll container
      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      const elementRect = sectionElement.getBoundingClientRect();
      const relativePosition = elementRect.top - containerRect.top + scrollContainerRef.current.scrollTop;
      
      // Scroll to the section
      scrollContainerRef.current.scrollTop = relativePosition - 24; // Adjust for top padding
      
      // Update the active section in the parent component
      if (onActiveSectionChange) {
        onActiveSectionChange(sectionIndex);
      }
    }
  };
  
  // Simple function to scroll to a subsection when clicked
  const handleSubSectionClick = (sectionIndex, subSectionIndex) => {
    const subSectionElement = document.getElementById(`subsection-${sectionIndex}-${subSectionIndex}`);
    if (subSectionElement && scrollContainerRef.current) {
      // Get the element's position relative to the scroll container
      const containerRect = scrollContainerRef.current.getBoundingClientRect();
      const elementRect = subSectionElement.getBoundingClientRect();
      const relativePosition = elementRect.top - containerRect.top + scrollContainerRef.current.scrollTop;
      
      // Scroll to the subsection
      scrollContainerRef.current.scrollTop = relativePosition - 24; // Adjust for top padding
      
      // Update the active section in the parent component
      if (onActiveSectionChange) {
        onActiveSectionChange(sectionIndex);
      }
    }
  };

  const renderCuratedBy = () => {
    return (
      <div 
        className="flex items-center gap-2 text-gray-400 text-sm mb-5 opacity-70"
        style={{ paddingLeft: "26px" }} // Add padding to align with the list items' vertical strip
      >
        <img 
          src={sparklesIcon} 
          alt="sparkles"
          className="w-4 h-4 text-gray-400"
        />
        <span>Curated by CoPlanner at 12:32 PM, 28 Dec 2024</span>
      </div>
    );
  };

  return (
    <DragDropContext onBeforeCapture={handleBeforeCapture} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-full w-full" style={{ position: 'relative' }}>
      <div className="w-full h-full mt-6 overflow-hidden" style={{ marginTop: '16px' }}>
        <div 
          ref={scrollContainerRef}
          className="mx-auto h-full"
          style={{ width: "100%", position: "relative" }}
        >
            {/* Stable wrapper with fixed dimensions */}
            <div className="h-full overflow-y-auto" 
                 style={{ 
                   width: "100%", 
                   minHeight: "200px", 
                   position: "relative",
                   borderRadius: "4px",
                   border: "1px solid var(--Cronos-Border-Seprator-Secondary, #D9D9D9)",
                   background: "#FFF",
                   padding: "24px 40px 0px 40px"
                 }}>
            {renderCuratedBy()}
            
              {/* Placeholder with fixed dimensions when content is loading */}
              {!isLoaded && (
                <div className="w-full animate-pulse" style={{ width: "100%" }}>
                  <div className="h-8 bg-gray-100 rounded mb-8" style={{ width: "25%" }}></div>
                  <div className="h-6 bg-gray-100 rounded mb-4" style={{ width: "75%" }}></div>
                  <div className="h-6 bg-gray-100 rounded mb-4" style={{ width: "66%" }}></div>
                  <div className="h-6 bg-gray-100 rounded mb-4" style={{ width: "60%" }}></div>
                </div>
              )}
              
              {/* Real content - only displayed when loaded */}
              {isLoaded && (
                <div className="transition-opacity duration-300 opacity-100">
                  {sections.map((section, sectionIndex) => (
                    <SectionBlock
                      key={sectionIndex}
                      section={section}
                            sectionIndex={sectionIndex}
                            onEditItem={handleEditItem}
                            onDeleteItem={handleDeleteItem}
                      draggedItemWidth={draggedItemWidth}
                          />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default SummarySection; 