import {Form, Input, ConfigProvider} from "antd";
import {NamePath} from "antd/es/form/interface";

type Props = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
  theme?: any;
};

export const CustomPasswordInput = ({
                                name,
                                placeholder,
                                dependencies,
                                theme,
                              }: Props) => {
  return (
    <ConfigProvider theme={theme}>
      <Form.Item
        name={name}
        dependencies={dependencies}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Обязательное поле",
          },
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value) {
                return Promise.resolve();
              }

              if (name === 'confirmPassword') {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Пароли должны совпадать")
                );
              } else {
                if (value.length < 6) {
                  return Promise.reject(
                    new Error("Пароль должен быть длиньше 6-ти символов")
                  );
                }

                return Promise.resolve();
              }
            },
          }),
        ]}
      >
        <Input.Password placeholder={placeholder} size="large"/>
      </Form.Item>
    </ConfigProvider>
  );
};
