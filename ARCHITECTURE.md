# Architecture Note

## Technical Choices
- **Framework:** Next.js 14+ (App Router) for a full-stack unified architecture.
- **Editor:** **Tiptap** (Headless Rich Text Editor). I chose Tiptap because it allows for full control over the UI while providing a robust selection of extensions (Headers, Lists, Formatting).
- **Persistence:** **Local JSON-based Store**. While I initially planned for Prisma + SQLite, I pivoted to a custom JSON-based storage layer to ensure zero-config reliability for the reviewer and to bypass environment-specific CLI issues.
- **Styling:** **Vanilla CSS Modules**. This ensured maximum control over the "premium" aesthetic without the overhead of learning specific Tailwind configurations for the reviewer.

## Prioritization & Tradeoffs
1.  **Mock Auth:** I prioritized a functional "Sharing" logic using mock users (`Alice`, `Bob`) over a full enterprise authentication system (NextAuth) to stay within the timebox.
2.  **File Upload:** I focused on `.txt` and `.md` imports as these are most relevant to a document editor, opting for a clean "Import File" experience on the dashboard.
3.  **Real-time:** Instead of WebSockets (which would increase infrastructure complexity), I used Next.js **Server Actions** and `revalidatePath` to simulate a highly responsive collaborative environment.

## Scaling
In a production environment, I would:
- Replace the JSON store with a managed Postgres instance (e.g., Supabase).
- Implement Hocuspocus (Tiptap's backend) for true real-time CRDT-based collaboration.
- Add real User Authentication (Clerk/NextAuth).
