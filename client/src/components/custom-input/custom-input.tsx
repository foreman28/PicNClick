import React from "react";
import {ConfigProvider, Form, Input} from "antd";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
  theme?: any;
};

export const CustomInput = ({
  type = 'text',
  name,
  placeholder,
  theme,
}: Props) => {

  return (
    <ConfigProvider theme={ theme }>
      <Form.Item
        name={name}
        rules={[{ required: true, message: 'Обязательное поле' }]}
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
