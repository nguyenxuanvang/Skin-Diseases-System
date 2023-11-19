import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReactQuillForm = () => {
  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
  };


  return (
    <div>
      <ReactQuill value={content} onChange={handleContentChange}   />
    </div>
  );
};

export default ReactQuillForm;
