'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import styles from './editor.module.css';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Heading1, Heading2 } from 'lucide-react';

export default function Editor({ content, onChange }: { content: string, onChange?: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {

      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? styles.active : ''}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? styles.active : ''}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? styles.active : ''}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </button>
        <div className={styles.divider} />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? styles.active : ''}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <div className={styles.divider} />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? styles.active : ''}
          title="Bulleted List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? styles.active : ''}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
      </div>
      <div className={styles.editorContainer}>
        <EditorContent editor={editor} className={styles.editor} />
      </div>
    </div>
  );
}
