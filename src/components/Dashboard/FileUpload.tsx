'use client';

import { useState, useRef } from 'react';
import { Upload, FilePlus } from 'lucide-react';
import styles from './fileupload.module.css';

export default function FileUpload({ onUpload }: { onUpload: (title: string, content: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const title = file.name.replace(/\.[^/.]+$/, "");
      
      // Basic conversion: text to HTML
      const htmlContent = content
        .split('\n')
        .map(line => line.trim() ? `<p>${line}</p>` : '<p><br></p>')
        .join('');

      onUpload(title, htmlContent);
    };

    if (file.name.endsWith('.md') || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      alert('Currently only .txt and .md files are supported.');
    }
  };

  return (
    <div className={styles.uploadArea}>
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept=".txt,.md"
        onChange={handleFileChange}
      />
      <button className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()}>
        <Upload size={18} /> Import File
      </button>
    </div>
  );
}
