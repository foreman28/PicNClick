import React, {useEffect, useState} from 'react';
import {List} from 'antd';
import styles from './tags-feed.module.scss';


const TagsFeed = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/posts`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch((error) => console.error('Ошибка получения данных из API:', error));
    }, []);

    return (
        <>
            <h1>Tags</h1>
            {/*<List*/}
            {/*    className={styles.list}*/}
            {/*    itemLayout="vertical"*/}
            {/*    size="large"*/}
            {/*    dataSource={data}*/}
            {/*    renderItem={(item) =>*/}
            {/*        <ForumPost post={item}/>*/}
            {/*    }*/}
            {/*/>*/}
        </>
    );
};

export default TagsFeed;
