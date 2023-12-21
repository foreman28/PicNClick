import {useState} from 'react';
import {Flex, Input, List, Typography} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {CustomTag} from "../custom-tag/custom-tag";
import {useGetAllPostsQuery} from "../../api/posts";

import styles from './search.module.scss';
import Paragraph from "antd/es/typography/Paragraph";

const {Search} = Input;
const {Title, Text} = Typography;

export const SearchComponent = () => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  
  const {data: searchResults} = useGetAllPostsQuery({
    q: search,
    pageSize: 6,
  });
  
  const handleSearch = async (value: string) => {
    if (value) {
      try {
        setSearch(value)
      } catch (error) {
        console.error('Ошибка при получении постов (поиск):', error);
      }
    } else {
      setSearch('')
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
      <Search
        placeholder="Поиск..."
        allowClear
        onSearch={sendSearch}
        onChange={(e) => handleSearch(e?.target.value)}
        className={styles.search}
      />
      
      {searchResults && (
        <List
          className={styles.list}
          size="small"
          bordered
          dataSource={searchResults.posts}
          renderItem={(item) => (
            <List.Item className={styles.item} key={item.id}>
              <Flex vertical gap={8} align={"flex-start"}>
                
                <Link
                  to={`/forum/${item.url}`}
                  className={styles.title}
                >
                  <Title level={5}>{item.title}</Title>
                  
                </Link>
                <Paragraph className={styles.text} ellipsis={{rows: 2}}>{item.description}</Paragraph>
                <CustomTag post={item} style={{fontSize: '12px', fontWeight: '500'}}/>
              </Flex>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};
