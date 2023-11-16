import React, {useEffect, useState} from "react";
import {Layout} from "../../components/layout/layout";
import {useParams} from "react-router-dom";
import styles from "./post.module.scss"
import {Flex, Tag} from "antd";

export const Post = () => {
    const {id} = useParams(); // Получаем значение динамического параметра из URL
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/posts/${id}`);

                const data = await response.json();
                setPostData(data);
            } catch (error) {
                console.error('Ошибка получения данных из API:', error);
            }
        };

        fetchPostData();
    }, [id]); // Зависимость от id, чтобы обновить данные при изменении id

    if (!postData) {
        return (
            <Layout>
                ...
            </Layout>
        );
    }

    return (
        <Layout>
            <img className={styles.img} src={postData.imageURL !== null ? postData.imageURL : "/img/Image-1.png"} alt={''}></img>
            <Flex gap={8}>
                {postData.tags.map((tag, index) => (
                    <Tag key={index} className={styles.tag}>
                        {tag}
                    </Tag>
                ))}
            </Flex>

            <h1 className={styles.title}>{postData.title}</h1>
            <p className={styles.text}>{postData.content}</p>


        </Layout>
    );
};
