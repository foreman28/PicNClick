import React from "react";
import {ConfigProvider, Form, Input} from "antd";
import {NamePath} from "antd/es/form/interface";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
  dependencies?: NamePath[];
  theme?: any;
  defaultValue?: string;
};

export const CustomInput = (
  {
    type = 'text',
    name,
    placeholder,
    dependencies,
    theme,
    defaultValue
  }: Props) => {
  return (
    <ConfigProvider theme={theme}>
      <Form.Item
        name={name}
        dependencies={dependencies}
        initialValue={defaultValue}
        hasFeedback={type === 'password'}
        rules={[
          {
            required: true,
            message: 'Обязательное поле',
          },
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value) {
                return Promise.resolve();
              }
              
              if (type === 'password' && name === 'confirmPassword') {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли должны совпадать'));
              } else if (type === 'password') {
                if (value.length < 6) {
                  return Promise.reject(new Error('Пароль должен быть длиньше 6-ти символов'));
                }
                return Promise.resolve();
              }
              
              return Promise.resolve();
            },
          }),
        ]}
      >
        {type === 'password' ? (
          <Input.Password placeholder={placeholder} size="large"/>
        ) : (
          <Input placeholder={placeholder} type={type} size="middle"/>
        )}
      </Form.Item>
    </ConfigProvider>
  );
};

