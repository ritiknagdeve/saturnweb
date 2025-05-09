import React from 'react';
import SubSectionBlock from './SubSectionBlock';

const SectionBlock = ({
  section,
  sectionIndex,
  onEditItem,
  onDeleteItem,
  draggedItemWidth
}) => (
  <div 
    key={sectionIndex} 
    id={`section-${sectionIndex}`} 
    className="mb-8 opacity-100 transition-opacity duration-300"
    style={{ width: "100%" }}
  >
        <h2 
      className="text-2xl font-normal text-gray-800 mb-5"
      style={{ 
        width: "100%",
        paddingLeft: "26px" // Add padding to align with the list items' vertical strip
      }}
    >
      {section.header}
    </h2>
    {section.sections && section.sections.map((subSection, subSectionIndex) => (
      <SubSectionBlock
        key={subSectionIndex}
        sectionIndex={sectionIndex}
        subSection={subSection}
        subSectionIndex={subSectionIndex}
        sectionHeader={section.header}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        draggedItemWidth={draggedItemWidth}
      />
    ))}
  </div>
);

export default SectionBlock; 