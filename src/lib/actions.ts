'use server';
// Force redeploy - cloud sync check

import { supabaseAdmin as supabase } from './supabase';
import { revalidatePath } from 'next/cache';

export async function createDocument(title: string, ownerId: string, initialContent?: string) {
  const { data, error } = await supabase
    .from('documents')
    .insert([{
      title,
      content: initialContent || `<h1>${title}</h1><p>Start writing...</p>`,
      owner_id: ownerId,
      updated_at: new Date().toISOString(),
      collaborators: []
    }])
    .select()
    .single();

  if (error) throw error;
  revalidatePath('/');
  return data;
}

export async function renameDocument(id: string, title: string) {
  const { data, error } = await supabase
    .from('documents')
    .update({ title, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath('/');
  revalidatePath(`/edit/${id}`);
  return data;
}

export async function updateDocument(id: string, content: string) {
  const { data, error } = await supabase
    .from('documents')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getDocument(id: string) {
  const { data: doc, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !doc) return null;

  // Manual join simulation for collaborators
  const collaborators: any[] = [];
  if (doc.collaborators && doc.collaborators.length > 0) {
    const { data: users } = await supabase
      .from('users')
      .select('*')
      .in('id', doc.collaborators);
    
    if (users) {
      users.forEach(user => collaborators.push({ user }));
    }
  }

  return { ...doc, ownerId: doc.owner_id, updatedAt: doc.updated_at, collaborators };
}

export async function getMyDocuments(userId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .or(`owner_id.eq.${userId},collaborators.cs.{${userId}}`);

  if (error) return [];
  return data.map(doc => ({
    ...doc,
    ownerId: doc.owner_id,
    updatedAt: doc.updated_at,
    shared: doc.owner_id !== userId
  }));
}

export async function shareDocument(docId: string, email: string) {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (userError || !user) throw new Error('User not found');

  const { data: doc } = await supabase
    .from('documents')
    .select('collaborators')
    .eq('id', docId)
    .single();

  if (!doc) throw new Error('Document not found');

  const collaborators = doc.collaborators || [];
  if (!collaborators.includes(user.id)) {
    collaborators.push(user.id);
    const { error } = await supabase
      .from('documents')
      .update({ collaborators })
      .eq('id', docId);
    if (error) throw error;
  }

  revalidatePath(`/edit/${docId}`);
  return user;
}
