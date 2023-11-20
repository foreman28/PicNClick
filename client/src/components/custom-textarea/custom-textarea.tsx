import React from "react";
import {ConfigProvider, Form, Input} from "antd";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
  theme?: any;
};

export const CustomTextarea = ({  // custom-textarea нету
  type = 'text',
  name,
  placeholder,
  theme,

}: Props) => {

  let message = 'Обязательное поле';

  return (
    <ConfigProvider theme={ theme }>
    <Form.Item
      name={name}
      rules={[{ required: true, message: message }]}
      shouldUpdate={ true }
    >
      <Input
        placeholder={ placeholder }
        type={ type }
        size="middle"
      />
    </Form.Item>
    </ConfigProvider>
  );
};
