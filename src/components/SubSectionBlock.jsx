import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import FactItem from './FactItem';

const SubSectionBlock = ({
  sectionIndex,
  subSection,
  subSectionIndex,
  sectionHeader,
  onEditItem,
  onDeleteItem,
  draggedItemWidth
}) => (
  <div 
    key={`${sectionIndex}-${subSectionIndex}`} 
    id={`subsection-${sectionIndex}-${subSectionIndex}`}
    className="mb-6"
    style={{ width: "100%" }}
  >
    {subSection.name && subSection.name !== sectionHeader && (
                  <h3 
                  className="text-xl font-normal text-gray-700 mb-4"
                  style={{ 
                    width: "100%",
                    paddingLeft: "26px" // Add padding to align with the list items' vertical strip
                  }}
                >
                  {subSection.name}
                </h3>
    )}
    <Droppable 
      droppableId={`droppable-${sectionIndex}-${subSectionIndex}`}
      renderClone={(provided, snapshot, rubric) => {
        const item = subSection.unstructured_facts[rubric.source.index];
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              width: draggedItemWidth ? `${draggedItemWidth}px` : undefined,
              margin: "0 0 1rem 0"
            }}
            className="relative select-none z-50"
          >
            <div className="flex items-center p-3 rounded-lg bg-white shadow-lg bg-gray-50 transition-all duration-200 group">
              <div className="flex items-center gap-2 w-full">
                {/* Drag handle - use active color when dragging */}
                <div className="flex-shrink-0 cursor-grab active:cursor-grabbing transition-colors duration-200 text-gray-800">
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {[1.5, 7, 12.5].map((cy) => (
                      <circle key={`l-${cy}`} cx="1.5" cy={cy} r="1.5"
                        fill="#1F2937"
                        className="transition-colors duration-200"
                      />
                    ))}
                    {[1.5, 7, 12.5].map((cy) => (
                      <circle key={`r-${cy}`} cx="6.5" cy={cy} r="1.5"
                        fill="#1F2937"
                        className="transition-colors duration-200"
                      />
                    ))}
                  </svg>
                </div>
                {/* Vertical strip - use active color when dragging */}
                <div className="w-1 self-stretch bg-gray-800 rounded-full flex-shrink-0 my-1 transition-colors duration-200"></div>
                {/* Content */}
                <div className="flex-1 text-gray-700 text-sm font-light leading-6 outline-none py-0.5">
                  {typeof item === 'object' ? item.content : item}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    >
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`transition-colors duration-200 py-1 px-0 ${snapshot.isDraggingOver ? 'bg-gray-50 rounded-lg' : ''}`}
          style={{ width: "100%", minHeight: '50px' }}
        >
          {subSection.unstructured_facts.map((fact, factIndex) => (
            <Draggable
              key={fact.id}
              draggableId={fact.id}
              index={factIndex}
            >
              {(provided, snapshot) => (
                <FactItem
                  item={fact}
                  sectionIndex={sectionIndex}
                  subSectionIndex={subSectionIndex}
                  factId={fact.id}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  draggableProps={provided.draggableProps}
                  dragHandleProps={provided.dragHandleProps}
                  innerRef={provided.innerRef}
                  isDragging={snapshot.isDragging}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

export default SubSectionBlock; 
