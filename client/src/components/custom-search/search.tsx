import { useState } from 'react';
import { ConfigProvider, Input, List } from 'antd';
import styles from './search.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const { Search } = Input;

const SearchComponent = (props: any) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const handleSearch = async (value: string) => {
    if (value) {
      if (value.startsWith('#')) {
        const partialTag = value.substring(1);
        
        // Fetch tag suggestions based on the partial tag
        const apiUrl = `${process.env.REACT_APP_API_URL}/tags?search=${partialTag}`;
        
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching tag suggestions:', error);
        }
      } else {
        const apiUrl = `${process.env.REACT_APP_API_URL}/posts?search=${value}`;
        
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
        }
      }
    } else {
      setSuggestions([]);
    }
  };
  
  const sendSearch = async (value: string) => {
    if (value) {
      navigate(`/search?search=${value}`);
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
            size="small"
            bordered
            dataSource={suggestions}
            renderItem={(item) => (
              <List.Item className={styles.item}>
                {/*to={item.url ? `/forum/${item.url}` : `/tags/${item.name}`}*/}
                <Link to={item.url ? `/forum/${item.url}` : `/search?search=${item.name}`}>
                  <span className={styles.title}>{item.title || item.name}</span>
                </Link>
              </List.Item>
            )}
            className={styles.list}
          />
        )}
      </ConfigProvider>
    </div>
  );
  
};

export default SearchComponent;
