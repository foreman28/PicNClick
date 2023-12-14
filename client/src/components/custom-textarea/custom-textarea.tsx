import {Form} from "antd";
import React, { useState} from "react";

import ReactQuill from 'react-quill'; // or quill
import 'react-quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css'; // Add css for bubble theme


import './custom-textarea.scss';


type CustomTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  theme?: any;
  modules?: any;
  formats?: any;
  maxLength?: number;
};

export const CustomTextarea: React.FC<CustomTextareaProps> = ({
                                                         value,
                                                         onChange,
                                                         placeholder = 'Содержание',
                                                         theme,
                                                         modules: customModules,
                                                         formats: customFormats,
                                                         maxLength = 10000,
                                                       }) => {
  
  let modules: any;
  if (!customModules) {
    modules = {
      toolbar: [
        [{'header': [1, 2, 3, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link', 'image', 'video'],
        [{'color': []}, {'background': []}],
        ['clean'],
      ],
    };
  } else {
    modules = customModules
  }
  
  let formats: any;
  if (!customFormats) {
    formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet',
      'link', 'image', 'video',
      'color', 'background',
    ];
  } else {
    formats = customFormats
  }
  
  
  const handleChange = (value: any, delta: any, source: any, editor: any) => {
    // onChange(value)
    console.log(value)
  };
  
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      modules={modules}
      formats={formats}
      className="custom-textarea"
      placeholder={placeholder}
    />
  );
};


// import { Form } from "antd";
// import Quill from 'quill'; // import Quill library
// import 'quill/dist/quill.snow.css'; // import Quill styles
//
// import './custom-textarea.scss';
// import React from "react";
//
// type Props = {
//   name: string;
//   placeholder?: string;
//   theme?: any;
//   modules?: any;
//   formats?: any;
//   maxLength?: number;
// };
//
// export const CustomTextarea = ({
//                                  name,
//                                  placeholder = 'Содержание',
//                                  theme,
//                                  modules: customModules,
//                                  formats: customFormats,
//                                  maxLength = 10000,
//                                }: Props) => {
//   let modules: any;
//   if (!customModules) {
//     modules = {
//       toolbar: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//         ['link', 'image', 'video'],
//         [{ 'color': [] }, { 'background': [] }],
//         ['clean'],
//       ],
//     };
//   } else {
//     modules = customModules;
//   }
//
//   const quillRef = React.useRef(null);
//
//   React.useEffect(() => {
//     if (quillRef.current) {
//       const quill = new Quill(quillRef.current, {
//         theme: 'snow',
//         modules: modules,
//       });
//
//       // Add event listener for value change
//       quill.on('text-change', () => {
//         // Get HTML content
//         const htmlContent = quill.root.innerHTML;
//
//         // You can use this content as needed
//         console.log(htmlContent);
//       });
//     }
//   }, [modules]);
//
//   return (
//     <Form.Item
//       className={"custom-textarea-box"}
//       name={name}
//       rules={[
//         {
//           required: true,
//           validator: (_, value) => {
//             if (value && value.trim() !== "<p><br></p>") {
//               return Promise.resolve();
//             }
//             return Promise.reject(new Error('ERROR'));
//           },
//         },
//       ]}
//       shouldUpdate={true}
//     >
//       <div ref={quillRef} className="custom-textarea" />
//     </Form.Item>
//   );
// };