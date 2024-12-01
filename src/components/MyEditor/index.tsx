import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

const MyEditor = (props: { className?: string }) => {
  let { className='' } = props;
  const handleEditorChange = (content: any) => {
    console.log(content);
  };
  const editorRef = useRef<any>()
  return (
    <div className={`${className}`}>
      <Editor
        apiKey="pmrn9f1olgn9kqk4mjnrl701qz5szskne3i8uy55s5gqdpg5"
        init={{
          height: 500,
          menubar: false,
          plugins: ['link', 'table', 'image', 'code'],
          toolbar:
            'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code',
        }}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default MyEditor;
