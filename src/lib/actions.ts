'use server';

import { readDb, writeDb, Document } from './db';
import { revalidatePath } from 'next/cache';

export async function createDocument(title: string, ownerId: string, initialContent?: string) {
  const db = await readDb();
  const newDoc: Document = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    content: initialContent || `<h1>${title}</h1><p>Start writing...</p>`,
    ownerId,
    updatedAt: new Date().toISOString(),
    collaborators: []
  };
  db.documents.push(newDoc);
  await writeDb(db);
  revalidatePath('/');
  return newDoc;
}

export async function renameDocument(id: string, title: string) {
  const db = await readDb();
  const index = db.documents.findIndex(d => d.id === id);
  if (index !== -1) {
    db.documents[index].title = title;
    db.documents[index].updatedAt = new Date().toISOString();
    await writeDb(db);
  }
  revalidatePath('/');
  revalidatePath(`/edit/${id}`);
  return db.documents[index];
}

export async function updateDocument(id: string, content: string) {
  const db = await readDb();
  const index = db.documents.findIndex(d => d.id === id);
  if (index !== -1) {
    db.documents[index].content = content;
    db.documents[index].updatedAt = new Date().toISOString();
    await writeDb(db);
  }
  return db.documents[index];
}

export async function getDocument(id: string) {
  const db = await readDb();
  const doc = db.documents.find(d => d.id === id);
  if (!doc) return null;
  
  const collaborators = doc.collaborators.map(cid => {
    const user = db.users.find(u => u.id === cid);
    return { user };
  });

  return { ...doc, collaborators };
}

export async function getMyDocuments(userId: string) {
  const db = await readDb();
  return db.documents.filter(d => d.ownerId === userId || d.collaborators.includes(userId));
}

export async function shareDocument(docId: string, email: string) {
  const db = await readDb();
  const user = db.users.find(u => u.email === email);
  if (!user) throw new Error('User not found');

  const doc = db.documents.find(d => d.id === docId);
  if (!doc) throw new Error('Document not found');

  if (!doc.collaborators.includes(user.id)) {
    doc.collaborators.push(user.id);
    await writeDb(db);
  }
  revalidatePath(`/edit/${docId}`);
  return user;
}
