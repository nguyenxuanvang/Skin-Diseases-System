import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const React_Quill = () => {
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

export default React_Quill;
