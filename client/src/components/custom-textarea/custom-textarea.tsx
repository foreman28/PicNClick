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
  maxLength?: number;
};

export const CustomTextarea = ({
                                 name,
                                 placeholder ='Содержание',
                                 theme,
                                 modules: customModules,
                                 formats: customFormats,
                                 maxLength = 100,
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
  
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [valueLength, setValueLength] = useState(true);
  
  const handleChange = (value: any, delta: any, source: any, editor: any) => {
    // Получаем plainText
    const plainText = editor.getText();
    
    // Получаем список изображений
    const images = editor.getContents().filter((op: any) => op.insert && op.insert.image);
    
    // Получаем текущее количество изображений
    const currentImageCount = images.length;
    
    // Максимальный размер файла в байтах (здесь 1 MB)
    const maxImageSize = 1024 * 1024;
    
    // Проверяем условия
    const overSizedImages = images.filter((op: any) => {
      const imageSrc = op.insert.image;
      const imageSize = imageSrc.size || 0;
      return imageSize > maxImageSize;
    });
    
    if (plainText.length <= maxLength && currentImageCount <= 10 && overSizedImages.length === 0) {
      // Устанавливаем контент и сбрасываем ошибку
      setContent(value);
      setError("Обязательное поле");
      setValueLength(true);
    } else {
      // Обрабатываем случай, когда есть изображения превышающие максимальный размер
      if (overSizedImages.length > 0) {
        setError(`Некоторые изображения превышают максимальный размер ${maxImageSize / (1024 * 1024)} MB`);
      } else {
        setError(
          `Превышено максимальное количество символов (${plainText.length} / ${maxLength}) или изображений (максимум 10)`
        );
      }
      setValueLength(false);
    }
  };
  
  return (
    <Form.Item
      className={"custom-textarea-box"}
      name={name}
      rules={[
        {
          required: true,
          validator: (_, value) => {
            if (value && valueLength && value.trim() !== "<p><br></p>") {
              return Promise.resolve();
            }
            return Promise.reject(new Error(error));
          },
        },
      ]}
      shouldUpdate={true}
    >
      <ReactQuill
        value={content}
        onChange={handleChange}
        theme="snow"
        modules={modules}
        formats={formats}
        className="custom-textarea"
        placeholder={placeholder}
      />
    </Form.Item>
  );
};
