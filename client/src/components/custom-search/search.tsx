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
      // Replace the URL with your actual API endpoint
      const apiUrl = process.env.REACT_APP_API_URL + `/posts?search=${value}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching Search suggestions:', error);
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
              <Link to={`/forum/${item.id}`}>
                <List.Item className={styles.item}>
                  <span className={styles.title}>{item.title}</span>
                </List.Item>
              </Link>
            )}
            className={styles.list}
          />
        )}
      </ConfigProvider>
    </div>
  );
};

export default SearchComponent;
