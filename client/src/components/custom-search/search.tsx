import React, {useState} from 'react';
import {Input, List} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

const {Search} = Input;

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);

    if (value) {
      // Replace the URL with your actual API endpoint
      const apiUrl = `http://localhost:8000/api/posts?search=${value}`;

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


  return (
    <div>
      <Search
        placeholder="Search for posts..."
        allowClear
        onSearch={(value) => handleSearch(value)}
        onChange={(e) => handleSearch(e.target.value)}
        style={{width: 300}}
        prefix={<SearchOutlined rev="true"/>}
      />

      {suggestions.length > 0 && (
        <List
          size="small"
          bordered
          dataSource={suggestions}
          renderItem={(item) => (
            <List.Item>{item.title}</List.Item>
          )}
          style={{marginTop: 10}}
        />
      )}
    </div>
  );
};

export default SearchComponent;
