import {useState} from 'react';
import {ConfigProvider, Flex, Input, List} from 'antd';
import styles from './search.module.scss';
import {Link, useNavigate} from 'react-router-dom';
import {CustomTag} from "../custom-tag/custom-tag";
import {useGetAllPostsQuery} from "../../api/posts";

const {Search} = Input;

const SearchComponent = (props: any) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  const { data: searchResults }  = useGetAllPostsQuery({
    q: search,
  });
  
  
  const handleSearch = async (value: string) => {
    if (value) {
      try {
        setSearch(value)
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
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
        {searchResults && searchResults.length > 0 && (
          <List
            className={styles.list}
            size="small"
            bordered
            dataSource={searchResults.slice(0, 6)}
            renderItem={(item) => (
              <List.Item className={styles.item} key={item.id}>
                <Flex vertical gap={4} align={"flex-start"}>
                  <Link
                    to={`/forum/${item.url}`}
                    className={styles.title}
                  >
                    {item.title}
                  </Link>
                  <span className={styles.text}>{item.description}</span>
                  <CustomTag post={item} style={{fontSize: '12px', fontWeight: '500'}}/>
                </Flex>
              </List.Item>
            )}
          />
        )}
      </ConfigProvider>
    </div>
  );
  
};

export default SearchComponent;
