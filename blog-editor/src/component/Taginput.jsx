import React, { useState } from 'react';

export default function TagInput({ tags, onChange }) {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      onChange([...tags, newTag]);
    }
    setInputValue('');
  };

  const removeTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    onChange(updatedTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <div className="d-flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span key={index} className="badge bg-primary d-flex align-items-center gap-1 px-3 py-2">
            {tag}
            <button
              type="button"
              className="btn-close btn-close-white btn-sm"
              aria-label="Remove"
              onClick={() => removeTag(index)}
              style={{ fontSize: '0.6rem' }}
            ></button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Add tag and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
