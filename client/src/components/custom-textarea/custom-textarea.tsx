import {Form, Input} from "antd";
import React, {useState} from "react";

import ReactQuill from 'react-quill'; // or quill
import 'react-quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme


import './custom-textarea.scss';


type CustomTextareaProps = {
  // value?: string;
  defaultValueTextarea?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  modules?: any;
  maxLength?: number;
};

export const CustomTextarea: React.FC<CustomTextareaProps> = (
  {
    // value,
    defaultValueTextarea,
    name,
    required = true,
    placeholder = 'Содержание',
    modules: customModules,
    maxLength = 10000,
  }) => {
  
  let modules: any;
  if (!customModules) {
    modules = {
      toolbar: [
        [{'header': [1, 2, 3, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [
          'link',
          // 'image',
          'video'
        ],
        [{'color': []}, {'background': []}],
        ['clean'],
      ],
    };
  } else {
    modules = customModules
  }

  
  return (
    <Form.Item
      className={"custom-textarea-box"}
      name={name}
      initialValue={defaultValueTextarea}
      rules={[
        {
          required: true,
          message: 'Обязательное поле',
          validator: (_, value) => {
            if (value && value.trim() !== "<p><br></p>") {
              return Promise.resolve();
            }
            return Promise.reject();
          },
        },
      ]}
      shouldUpdate={true}
    >
      <ReactQuill
      // value={value}
      // defaultValue={defaultValueTextarea}
      theme="snow"
      modules={modules}
      className="custom-textarea"
      placeholder={placeholder}
    />
    </Form.Item>
  );
};