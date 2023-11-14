'use-client';

import dynamic from 'next/dynamic';
import { FC } from 'react';
import 'react-quill/dist/quill.snow.css'; // импортируй стили

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const TextEditor: FC<TextEditorProps> = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
          ['clean'],
        ],
      }}
    />
  );
};
