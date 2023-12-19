import {ConfigProvider, Form, Select, Space} from 'antd';
import styles from './custom-select.module.scss';

type Props = {
  selectOptions: any;
  name: string;
  placeholder?: string;
  theme?: any;
};

const SelectComponent = ({selectOptions, name, placeholder, theme}: Props) => {
  // const [selectedValues, setSelectedValues] = useState<string[]>([]);
  
  // const handleChange = (value: string[]) => {
  //   console.log(`selected ${value}`);
  //   setSelectedValues(value);
  // };
  
  return (
    <ConfigProvider theme={theme}>
      <Form.Item
        className={"custom-textarea-box"}
        name={name}
        rules={[{required: true, message: 'Обязательное поле'}]}
        shouldUpdate={true}
      >
        <Select
          mode="multiple"
          style={{width: '100%'}}
          className={styles.select}
          placeholder={placeholder}
          // onChange={handleChange}
          optionLabelProp="label"
          options={selectOptions}
          optionRender={(option) => (
            <Space>
              <span role="img" aria-label={option.data.label}>
                {option.data.label}
              </span>
            </Space>
          )}
          // notFoundContent={'Пусто'}
        />
      </Form.Item>
    </ConfigProvider>
  );
};

export default SelectComponent;
