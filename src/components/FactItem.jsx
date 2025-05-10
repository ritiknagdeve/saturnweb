import React, { useEffect, useState, useRef } from 'react';

const FactItem = ({ 
  item, 
  sectionIndex, 
  subSectionIndex, 
  factId,
  onEdit,
  onDelete,
  dragHandleProps,
  draggableProps,
  innerRef,
  isDragging
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content || item);
  const contentEditableRef = useRef(null);

  useEffect(() => {
    if (isEditing && contentEditableRef.current) {
      contentEditableRef.current.focus();
      // Place cursor at the end of the text
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(contentEditableRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [isEditing]);

  const handleEdit = () => {
    if (!isDragging) {
      setIsEditing(true);
    }
  };

  const saveChanges = () => {
    if (contentEditableRef.current) {
      const newContent = contentEditableRef.current.innerText.trim();
      if (newContent !== '') {
        onEdit(sectionIndex, subSectionIndex, factId, newContent);
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveChanges();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      if (contentEditableRef.current) {
        contentEditableRef.current.innerText = item.content || item;
      }
    }
  };

  const handleBlur = () => {
    saveChanges();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(sectionIndex, subSectionIndex, factId);
  };

  const content = typeof item === 'object' ? item.content : item;

  return (
    <div 
      ref={innerRef} 
      {...draggableProps} 
      data-fact-card={factId}
      className={`relative mb-4 select-none ${isDragging ? 'z-50' : ''}`}
    >
      <div 
        className={`flex items-center p-3 rounded-lg bg-white hover:bg-[#F2F2F2] active:bg-[#F2F2F2] transition-all duration-200 group ${isDragging ? 'shadow-lg !bg-[#F2F2F2]' : ''}`}
      >
        <div className="flex items-center gap-2 w-full">
          {/* Drag handle */}
          <div
            className={`flex-shrink-0 cursor-grab active:cursor-grabbing transition-all duration-200 opacity-0 group-hover:opacity-100
              ${isDragging ? 'text-gray-800 opacity-100' : 'text-gray-200 group-hover:text-gray-800'}`}
            {...dragHandleProps}
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              {[1.5, 7, 12.5].map((cy) => (
                <circle key={`l-${cy}`} cx="1.5" cy={cy} r="1.5"
                  fill="currentColor"
                  className="transition-colors duration-200"
                />
              ))}
              {[1.5, 7, 12.5].map((cy) => (
                <circle key={`r-${cy}`} cx="6.5" cy={cy} r="1.5"
                  fill="currentColor"
                  className="transition-colors duration-200"
                />
              ))}
            </svg>
          </div>
          
          {/* Vertical strip */}
          <div
            style={{ width: '2px' }}
            className={`self-stretch rounded-full flex-shrink-0 my-1 transition-colors duration-200
              ${isDragging ? 'bg-gray-800' : 'bg-gray-200 group-hover:bg-gray-800'}`}
          />
          
          {/* Content - editable in place */}
          <div 
            className={`flex-1 text-sm font-light leading-6 outline-none py-0.5 transition-colors duration-200 ${
              isEditing ? 'text-gray-800' : 'text-[#7F7F7F] group-hover:text-gray-800'
            }`}
            ref={contentEditableRef}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onClick={!isEditing ? handleEdit : undefined}
            dangerouslySetInnerHTML={{ __html: isEditing ? editedContent : content }}
          />
      
          {/* Delete button - only show on hover */}
          <button 
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 flex-shrink-0 self-center"
            onClick={handleDelete}
            aria-label="Delete item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FactItem; 