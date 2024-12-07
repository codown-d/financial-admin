import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';

const MyEditor = (props: {
  className?: string;
  value?: string;
  onChange?: (arg: string) => void;
}) => {
  let { className = '' } = props;
  let [value, setValue] = useState(props.value);
  const handleEditorChange = (content: any) => {
    setValue(content);
    props.onChange?.(content);
  };

  useEffect(() => {
  }, [value]);
  const editorRef = useRef<any>();
  return (
    <div className={`${className}`}>
      <Editor
        apiKey="pmrn9f1olgn9kqk4mjnrl701qz5szskne3i8uy55s5gqdpg5"
        value={value}
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
