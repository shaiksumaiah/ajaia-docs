# Ajaia Collab Docs

A lightweight, collaborative document editor built with Next.js and Tiptap.

## Features
- **Document CRUD:** Create, Rename, and Edit documents with auto-save.
- **Rich Text Editor:** Powered by Tiptap (Bold, Italic, Headings, Lists).
- **File Upload:** Import `.txt` and `.md` files as new documents.
- **Sharing:** Mock authentication and document sharing system (Alice & Bob).
- **Persistence:** Local JSON-based database (`db.json`).

## Local Setup

1.  **Clone & Install:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Access App:**
    Open [http://localhost:3000](http://localhost:3000)

## Test Accounts
The app uses mock authentication. You can "switch" users by logging out and typing one of these emails (though Alice is logged in by default):
- **Alice:** `alice@example.com`
- **Bob:** `bob@example.com`

## Tech Stack
- **Frontend:** Next.js (App Router), Vanilla CSS Modules
- **Editor:** Tiptap
- **Persistence:** Node.js `fs` (db.json)
- **Icons:** Lucide React
