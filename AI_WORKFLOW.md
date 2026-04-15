# AI Workflow Note

## Tools Used
- **Antigravity (System-level AI Agent):** Used for architecture planning, code generation, and debugging.
- **Tiptap Copilot (Simulated):** Leveraged for rich-text editor patterns.

## Material Speedup
1.  **Boilerplate Generation:** AI generated the initial Next.js project structure, CSS Modules, and Tiptap configuration in seconds.
2.  **Server Actions Logic:** The CRUD logic for the document system and the pivot to a JSON-based store were rapidly implemented with AI assistance.
3.  **UI/UX Aesthetic:** AI helped refine the "premium" CSS values (shadows, transitions, spacing) to match a professional document editor feel.

## Changes & Rejections
1.  **Persistence Strategy:** AI initially suggested Prisma + SQLite. However, when environment-specific CLI issues occurred, I (the developer) made the judgment call to pivot to a documented JSON file store to ensure the reviewer has a reliable, zero-config experience.
2.  **Scope Refinement:** Initially, an extra "Delete" feature was added for quality; however, per user requirements to keep the scope strict, **I deliberately removed the Delete feature** to perfectly match the assignment's requested capabilities.

## Verification & Reliability
- **Manual Flow:** Verified the entire flow from creation -> editing -> uploading -> sharing.
- **Error Handling:** Implemented fallbacks for missing documents and mock user data.
- **Code Quality:** Reviewed AI-generated CSS for redundancy and ensured semantic HTML structure.
