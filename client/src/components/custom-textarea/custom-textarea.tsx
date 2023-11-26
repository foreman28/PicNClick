import {Form} from "antd";
import {useState} from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './custom-textarea.scss';


type Props = {
  name: string;
  placeholder?: string;
  theme?: any;
  modules?: any;
  formats?: any;
};

export const CustomTextarea = ({
                                 name,
                                 placeholder,
                                 theme,
                                 modules: customModules,
                                 formats: customFormats,
                               }: Props) => {
  
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
  
  
  // const [content, setContent] = useState('');
  // const [error, setError] = useState('');
  //
  // const handleChange = (value:any, delta:any, source:any, editor:any) => {
  //     const maxLength = 10; // Замените на ваше максимальное количество символов
  //
  //     // Удаление HTML-тегов и проверка максимального количества символов
  //     const plainText = editor.getText();
  //     if (plainText.length <= maxLength) {
  //       setContent(value);
  //       setError('');
  //     } else {
  //       // Обрезаем текст до максимального количества символов
  //       const truncatedText = plainText.slice(0, maxLength);
  //
  //       // Преобразование обрезанного текста обратно в формат Quill
  //       const delta = editor.clipboard.convert(truncatedText);
  //       editor.setContents(delta);
  //
  //       setError(`Превышено максимальное количество символов (${maxLength})`);
  //     }
  //   };

  
  return (
    <Form.Item
      className={"custom-textarea-box"}
      name={name}
      rules={[
        {
          required: true,
          validator: (_, value) => {
            if (value && value.trim() !== "<p><br></p>") {
              // if (error) {
              //   setError('');
              // }
              return Promise.resolve();
            }
            return Promise.reject(new Error("Обязательное поле"));
          },
        },
      ]}
      shouldUpdate={true}
      // help={error} // Вывод сообщения об ошибке
    >
      <ReactQuill
        // value={content}
        // onChange={handleChange}
        modules={modules}
        formats={formats}
        className="custom-textarea"
        placeholder="Содержание"
      />
    </Form.Item>
  );
};