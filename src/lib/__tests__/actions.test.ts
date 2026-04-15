import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createDocument } from '../actions';
import * as db from '../db';

vi.mock('../db', () => ({
  readDb: vi.fn(),
  writeDb: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('Document Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a new document correctly', async () => {
    const mockDb = { users: [], documents: [] };
    (db.readDb as any).mockResolvedValue(mockDb);
    (db.writeDb as any).mockResolvedValue(undefined);

    const title = 'Test Doc';
    const ownerId = 'user_1';

    const doc = await createDocument(title, ownerId);

    expect(doc.title).toBe(title);
    expect(doc.ownerId).toBe(ownerId);
    expect(doc.content).toContain(title);
    expect(db.writeDb).toHaveBeenCalled();
  });
});
