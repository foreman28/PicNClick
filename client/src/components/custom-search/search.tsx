import {useState} from 'react';
import {ConfigProvider, Flex, Input, List, Tag} from 'antd';
import styles from './search.module.scss';
import {Link, useNavigate} from 'react-router-dom';
import {CustomTag} from "../custom-tag/custom-tag";

const {Search} = Input;

const SearchComponent = (props: any) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const handleSearch = async (value: string) => {
    if (value) {
      const apiUrl = `${process.env.REACT_APP_API_URL}/posts?q=${value}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };
  
  
  const sendSearch = async (value: string) => {
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/search`);
    }
  };
  
  return (
    <div className={styles.searchBox}>
      <ConfigProvider theme={props.theme}>
        <Search
          placeholder="Поиск..."
          allowClear
          onSearch={sendSearch}
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.search}
        />
        
        {suggestions.length > 0 && (
          <List
            className={styles.list}
            size="small"
            bordered
            dataSource={suggestions.slice(0, 8)}
            renderItem={(item) => (
              <Link to={item.url ? `/forum/${item.url}` : `/search?q=${item.name}`}>
              <List.Item className={styles.item}>
                  <Flex vertical gap={8}>
                    <Flex gap={8} align={"center"}>
                      <span className={styles.title}>{item.title}</span>
                      <span className={styles.text}>{item.description}</span>
                    </Flex>
                    
                    <CustomTag post={item} style={{fontSize:'12px', fontWeight: '500'}} />
                  </Flex>
              </List.Item>
              </Link>
            )}
          />
        )}
      </ConfigProvider>
    </div>
  );
  
};

export default SearchComponent;
