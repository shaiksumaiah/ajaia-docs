'use client';

import { useState } from 'react';
import styles from './sharing.module.css';
import { X, UserPlus, Shield } from 'lucide-react';

export default function SharingModal({ 
  isOpen, 
  onClose, 
  docId, 
  docTitle,
  collaborators = [],
  onShare
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  docId: string,
  docTitle: string,
  collaborators?: any[],
  onShare: (email: string) => void
}) {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleShare = () => {
    onShare(email);
    setEmail('');
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Share "{docTitle}"</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <input 
              type="email" 
              placeholder="Add people by email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={styles.addBtn} onClick={handleShare}>
              <UserPlus size={18} /> Add
            </button>
          </div>
        </div>

        <div className={styles.list}>
          <h4>People with access</h4>
          <div className={styles.item}>
            <div className={styles.avatar}>A</div>
            <div className={styles.info}>
              <span className={styles.name}>Alice (Owner)</span>
              <span className={styles.email}>alice@example.com</span>
            </div>
            <span className={styles.role}>Owner</span>
          </div>
          {collaborators.map((c, i) => (
            <div className={styles.item} key={i}>
              <div className={styles.avatar}>{c.user?.name[0] || 'U'}</div>
              <div className={styles.info}>
                <span className={styles.name}>{c.user?.name || 'Unknown'}</span>
                <span className={styles.email}>{c.user?.email}</span>
              </div>
              <span className={styles.role}>Editor</span>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p><Shield size={14} /> Only people with access can open with this link</p>
          <button className={styles.doneBtn} onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
