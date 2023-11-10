import React, {useEffect, useState} from 'react';
import {List, Avatar, Space, Tag, Typography} from 'antd';
import {
    MessageOutlined,
    LikeOutlined,
    ClockCircleOutlined,
} from '@ant-design/icons';

import styles from './forum-feed.module.scss';

const {Text} = Typography;

const ForumFeed = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const apiUrl = "http://localhost:8000/api/posts";

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => console.error('Ошибка получения данных из API:', error));
    }, []); // Пустой массив зависимостей означает, что эффект будет запущен только после монтирования компонента
    console.log(data)
    return (
        <List
            className={styles.list}
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    className={styles.item}
                    key={item.title}
                    actions={[
                        <Space>
                            <MessageOutlined key="comments"/>
                            <span>{item.commentsCount}</span>
                        </Space>,
                        <Space>
                            <LikeOutlined key="like"/>
                            <span>45</span>
                        </Space>,
                        <Space>
                            <ClockCircleOutlined key="clock"/>
                            <span> {item.timestamp}</span>
                        </Space>,
                    ]}
                    extra={
                        <Space>
                            <Avatar src="/img/avatar.jpg"/>
                            <Text strong>{item.author}</Text>
                        </Space>
                    }
                >
                    <List.Item.Meta
                        title={<a className={styles.item_title} href={`/forum/${item.title}`}>{item.title}</a>}
                        description={
                            <div>
                                <div className={styles.item_text}>{item.content}</div>

                                <Space>
                                    {item.tags.map((tag, index) => (
                                        <Tag key={index} className={styles.item_tag}>{tag}</Tag>
                                    ))}
                                </Space>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default ForumFeed;
