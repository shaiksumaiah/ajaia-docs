export const dynamic = 'force-dynamic';
import EditClient from './EditClient';

import { getDocument } from '@/lib/actions';
import { notFound } from 'next/navigation';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Mock document if DB fails
  const mockDoc = {
    id: 'mock-1',
    title: 'New Document',
    content: '<h1>New Document</h1><p>Start writing...</p>',
    collaborators: []
  };

  let doc = null;
  try {
    doc = await getDocument(id);
  } catch (e) {
    console.warn("DB failed, using mock");
    doc = mockDoc;
  }

  if (!doc && id !== 'mock-1') {
    notFound();
  }

  return <EditClient id={id} initialDoc={doc || mockDoc} />;
}
