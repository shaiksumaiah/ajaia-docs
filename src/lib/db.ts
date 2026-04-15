import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  ownerId: string;
  updatedAt: string;
  collaborators: string[]; // User IDs
}

export interface Database {
  users: User[];
  documents: Document[];
}

const DEFAULT_DB: Database = {
  users: [
    { id: 'user_1', name: 'Alice', email: 'alice@example.com' },
    { id: 'user_2', name: 'Bob', email: 'bob@example.com' },
  ],
  documents: [
    { 
      id: '1', 
      title: 'Getting Started', 
      content: '<h1>Getting Started</h1><p>Welcome to Ajaia Docs!</p>', 
      ownerId: 'user_1', 
      updatedAt: new Date().toISOString(),
      collaborators: []
    }
  ],
};

async function ensureDb() {
  try {
    await fs.access(DB_PATH);
  } catch (e) {
    await fs.writeFile(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2));
  }
}

export async function readDb(): Promise<Database> {
  await ensureDb();
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function writeDb(db: Database) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
}
