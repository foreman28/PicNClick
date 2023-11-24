import {Flex, List, Space, Tag} from 'antd';
import { Link } from 'react-router-dom';
import { Paths } from "../../paths";
import styles from './tag-item.module.scss';
import {useEffect, useRef} from "react";

const TagItem = ({ tag }) => {

  const tagRef = useRef(null);

  useEffect(() => {
    // Функция для обработки клика по ссылке
    const handleClick = () => {
      // Используем scrollIntoView для прокрутки к элементу
      tagRef.current.scrollIntoView({
        behavior: 'smooth', // Добавляем плавную анимацию
        block: 'start',     // Устанавливаем блокирование вверху
        inline: 'nearest'   // Выравниваем элемент по ближайшей стороне
      });

      // Добавляем дополнительный отступ, если это необходимо
      const offset = 70; // Задайте необходимый отступ в пикселях

      // Добавляем задержку в выполнении кода
      setTimeout(() => {
        window.scrollBy(0, -offset);
      }, 0); // Измените значение задержки при необходимости
    };

    // Проверяем, существует ли реф, прежде чем добавлять обработчик
    if (tagRef.current) {
      // Добавляем обработчик клика
      tagRef.current.addEventListener('click', handleClick);
    }

    // Очищаем обработчик при размонтировании компонента
    return () => {
      if (tagRef.current) {
        tagRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <List.Item ref={tagRef} id={`${tag.name}`} className={styles.item} key={tag.id}>
      <List.Item.Meta
        title={
          // <Link to={`#${tag.name}`} className={styles.title}>
          //   #{tag.name}
          // </Link>
          <a href={`${Paths.tags}#${tag.name}`} className={styles.title}>#{tag.name}</a>
        }
        description={
          <Space>
            <span>{tag.posts.length} Posts</span>
          </Space>
        }
      />
      <Flex gap={8} wrap={"wrap"} justify={"flex-start"} className={styles.tags}>
        {tag.posts.map((post, index) => (
          <Tag key={index} className={styles.tag}>
            <Link to={`/forum/${post.url}`}>{post.title}</Link>
          </Tag>
        ))}
      </Flex>
    </List.Item>
  );
};

export default TagItem;
