import {ConfigProvider, Form, Select, SelectProps, Space} from 'antd';
import styles from './custom-select.module.scss';

type Props = {
  name: string;
  placeholder?: string;
  theme?: any;
};

const SearchComponent = ({
                           name,
                           placeholder,
                           theme,
                         }: Props) => {
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const options: SelectProps['options'] = [
    {
      label: 'China',
      value: 'china',
      // emoji: '🇨🇳',
      desc: 'China',
    },
    {
      label: 'USA',
      value: 'usa',
      // emoji: '🇺🇸',
      desc: 'USA',
    },
    {
      label: 'Japan',
      value: 'japan',
      // emoji: '🇯🇵',
      desc: 'Japan',
    },
    {
      label: 'Korea',
      value: 'korea',
      // emoji: '🇰🇷',
      desc: 'Korea',
    },
  ];

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
          onChange={handleChange}
          optionLabelProp="label"
          options={options}
          optionRender={(option) => (
            <Space>
              <span role="img" aria-label={option.data.label}>
                {option.data.emoji}
              </span>
              {option.data.desc}
            </Space>
          )}
        />
      </Form.Item>
    </ConfigProvider>
  );
};

export default SearchComponent;
