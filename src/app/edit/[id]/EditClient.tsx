'use client';

import { useState, useEffect } from 'react';
import Editor from '@/components/Editor/Editor';
import { updateDocument, shareDocument, renameDocument } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import styles from './edit.module.css';
import SharingModal from '@/components/Sharing/SharingModal';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditClient({ id, initialDoc }: { id: string, initialDoc: any }) {
  const [doc, setDoc] = useState(initialDoc);
  const [isSharingOpen, setIsSharingOpen] = useState(false);
  const [status, setStatus] = useState('Saved');
  const [title, setTitle] = useState(initialDoc.title);
  const router = useRouter();

  const handleContentChange = async (html: string) => {
    setStatus('Saving...');
    try {
      await updateDocument(id, html);
      setStatus('Saved');
    } catch (err) {
      console.error(err);
      setStatus('Error');
    }
  };

  const handleTitleBlur = async () => {
    if (title === doc.title) return;
    try {
      await renameDocument(id, title);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async (email: string) => {
    try {
      await shareDocument(id, email);
      router.refresh();
      // Wait a bit for revalidation
      setTimeout(async () => {
        const { getDocument } = await import('@/lib/actions');
        const updated = await getDocument(id);
        if (updated) setDoc(updated);
      }, 500);
    } catch (err) {
      alert('User not found or sharing failed');
    }
  };

  if (!doc) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <Link href="/" className={styles.backBtn}><ChevronLeft size={24} /></Link>
          <input 
            className={styles.titleInput} 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
          />
          <span className={styles.status}>{status}</span>
        </div>
        <div className={styles.actions}>
          <button 
            className={styles.shareBtn}
            onClick={() => setIsSharingOpen(true)}
          >
            Share
          </button>
        </div>
      </header>
      <div className={styles.editorArea}>
        <Editor content={doc.content || ''} onChange={handleContentChange} />
      </div>

      <SharingModal 
        isOpen={isSharingOpen} 
        onClose={() => setIsSharingOpen(false)} 
        docId={id}
        docTitle={title}
        collaborators={doc.collaborators}
        onShare={handleShare}
      />
    </div>
  );
}
