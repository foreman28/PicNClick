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
      className={"custom-textarea-box"}
      name={name}
      rules={[
        {
          required: true,
          validator: (_, value) => {
            if (value && value.trim() !== "<p><br></p>") {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Обязательное поле"));
          },
        },
      ]}

      shouldUpdate={ true }
    >
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        className={"custom-textarea"}
        placeholder={"Содержание"}
      />
    </Form.Item>
  );
};
