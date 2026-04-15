'use client';

import { useState } from 'react';
import styles from './dashboard.module.css';
import { Plus, FileText, Share2, Clock } from 'lucide-react';
import Link from 'next/link';
import FileUpload from './FileUpload';
import { createDocument } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function Dashboard({ initialDocuments }: { initialDocuments: any[] }) {
  const router = useRouter();
  const { user } = useAuth();
  const [documents, setDocuments] = useState(initialDocuments);

  const handleCreate = async () => {
    if (!user) return;
    try {
      const doc = await createDocument('Untitled Document', user.id);
      router.push(`/edit/${doc.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (title: string, content: string) => {
    if (!user) return;
    try {
      const doc = await createDocument(title, user.id, content);
      router.push(`/edit/${doc.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 style={{ color: '#fff' }}>My Documents</h1>
        <div className={styles.headerActions}>
          <FileUpload onUpload={handleUpload} />
          <button className={styles.createBtn} onClick={handleCreate}>
            <Plus size={20} /> New Document
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        {documents.map((doc) => (
          <Link href={`/edit/${doc.id}`} key={doc.id} className={styles.card}>
            <div className={styles.cardIcon}>
              <FileText size={40} color="#4285f4" />
            </div>
            <div className={styles.cardInfo}>
              <h3>{doc.title}</h3>
              <div className={styles.cardMeta}>
                <span><Clock size={14} /> {doc.updatedAt}</span>
                {doc.shared && <span className={styles.badge}><Share2 size={12} /> Shared</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
