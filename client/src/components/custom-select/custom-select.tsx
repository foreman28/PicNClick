import {ConfigProvider, Form, Select, SelectProps, Space} from 'antd';
import styles from './custom-select.module.scss';
import {useGetAllTagsQuery} from "../../api/tags";
import {useEffect, useState} from "react";

type Props = {
  name: string;
  placeholder?: string;
  theme?: any;
};

const SelectComponent = ({name, placeholder, theme}: Props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
    setSelectedValues(value);
  };
  
  const {data: tags, error, isLoading: isLoadingTags} = useGetAllTagsQuery();
  
  const selectOptions: SelectProps['options'] = tags
    ? tags.map((tag) => ({
      label: tag.name,
      value: tag.id,
      desc: tag.description,
    }))
    : [];
  
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
