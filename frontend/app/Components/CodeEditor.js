// app/Components/CodeEditor.js

"use client"

import React from 'react'
import MonacoEditor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {
  
  const handleEditorChange = (value) => {
    onChange(value);  // Handle code change in the editor
  };

  return (
    <MonacoEditor
      height="400px"  // Set the editor height
      language={language || "java"}  // Set the language mode, default to Java
      value={value}  // The initial code in the editor
      onChange={handleEditorChange}  // Handle changes in code
      theme="vs-dark"  // Set the theme (vs-dark is the dark theme)
      options={{
        selectOnLineNumbers: true,
        minimap: { enabled: false },  // Hide the minimap (optional)
        wordWrap: 'on',  // Enable word wrapping
        fontSize: 14,  // Set font size
      }}
    />
  );
}

export default CodeEditor;
