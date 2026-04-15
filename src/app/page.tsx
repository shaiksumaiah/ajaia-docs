export const dynamic = 'force-dynamic';
import Dashboard from '@/components/Dashboard/Dashboard';

import { getMyDocuments } from '@/lib/actions';

export default async function Home() {
  // Use a hardcoded user ID for now (Alice)
  const documents = await getMyDocuments('user_1');
  
  // Convert dates and shared status for UI
  const processedDocs = documents.map(doc => ({
    id: doc.id,
    title: doc.title,
    updatedAt: new Date(doc.updatedAt).toLocaleDateString(),
    shared: doc.ownerId !== 'user_1' || doc.collaborators.length > 0
  }));

  return (
    <main>
      <Dashboard initialDocuments={processedDocs} />
    </main>
  );
}
