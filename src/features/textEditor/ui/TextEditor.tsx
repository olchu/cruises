'use client';

import dynamic from 'next/dynamic';
import { FC, forwardRef, useCallback, useMemo, useRef } from 'react';
import 'react-quill/dist/quill.snow.css'; // импортируй стили
import Delta from 'quill-delta';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');

    //@ts-ignore
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

export const TextEditor: FC<TextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef(false);

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      //@ts-ignore
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/admin/imgeUpload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const { imageUrl } = await response.json();
          const altText = window.prompt('Введите текст для alt', '');
          //@ts-ignore
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);

          const delta = new Delta()
            .retain(range.index)
            .insert(
              { image: `https://new.vbp.ru${imageUrl}`, alt: altText },
              { alt: altText }
            )
            .retain(value.length - range.index);
          quill.updateContents(delta);
          quill.setSelection(range.index + 1);
        } else {
          console.error('Ошибка загрузки изображения');
        }
      }
    };
  }, []);

  const toolbar = useMemo(() => {
    return {
      container: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
        ['image'],
      ],
      handlers: {
        image: () => {
          imageHandler();
        },
      },
    };
  }, []);

  return (
    <ReactQuill
      //@ts-ignore
      forwardedRef={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: toolbar,
      }}
    />
  );
};
