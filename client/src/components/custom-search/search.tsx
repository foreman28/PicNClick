import {useState} from 'react';
import {ConfigProvider, Input, List} from 'antd';
import {search} from "../../themes/search";
import styles from "./search.module.scss";
import {Link, useNavigate} from "react-router-dom";
import Title from "antd/lib/typography/Title";

const {Search} = Input;

const SearchComponent = (theme: any) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();
  const handleSearch = async (value: string) => {
    setSearchTerm(value);

    if (value) {
      // Replace the URL with your actual API endpoint
      const apiUrl = process.env.REACT_APP_API_URL + `/posts?search=${value}`;

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

  const sendSearch = async (value: String) => {
    navigate(`/search?search=${value}`);
    // console.log(suggestions)

  }

  return (
    <div className={styles.searchBox}>
      <ConfigProvider
        theme={search}>
        <Search
          placeholder="Search for posts..."
          allowClear
          onSearch={
            (value) => sendSearch(value)

            // (value) => handleSearch(value)
            //   .then(() => sendSearch())
          }
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.search}
          // enterButton={'asd'}

        />

        {suggestions.length > 0 && (
          <List
            size="small"
            bordered
            dataSource={suggestions}
            renderItem={(item) => (
              <Link to={"/forum/" + item.id}>
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
