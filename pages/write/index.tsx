import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

const Write = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
  return (
    <>
    <Editor
      apiKey='pxbrcm6e7o6npvos2z16chat7dfuknqf8cfv0191uuyop6cw'
      onInit={(evt, editor) => editorRef.current = editor}
      initialValue="<p>This is the initial content of the editor.</p>"
      init={{
        height: 500,
        menubar: 'code',
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help' + ' code',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
    <button onClick={log}>Log editor content</button>
  </>
  )
}

export default Write