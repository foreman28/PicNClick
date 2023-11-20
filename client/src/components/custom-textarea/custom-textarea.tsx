import { Form } from "antd";
import {useState} from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './custom-textarea.scss';


type Props = {
  name: string;
  placeholder?: string;
  theme?: any;
};

export const CustomTextarea = ({
                                 name,
                                 placeholder,
                                 theme,
                               }: Props) => {
  const [content, setContent] = useState('');
  
  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image', 'video'],
      [{'color': []}, {'background': []}],
      ['clean'],
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video',
    'color', 'background',
  ];
  const handleChange = (value: any) => {
    setContent(value);
  };
  
  return (
    <Form.Item
      name={name}
    >
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </Form.Item>
  );
};
