import { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {Paths} from "../../paths";

export const CustomBreadcrumb = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);
  
  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
      const pathsMap:any = {
        [Paths.forum.substring(1)]: 'Форум',
        [Paths.userPosts.substring(1)]: 'Посты пользователя',
        [Paths.addPost.substring(1)]: 'Добавить пост',
        [Paths.editPost.substring(1)]: 'Изменить пост',
        [Paths.search.substring(1)]: 'Поиск',
        [Paths.tags.substring(1)]: 'Теги',
        [Paths.users.substring(1)]: 'Пользователи',
        [Paths.profile.substring(1)]: 'Профиль',
      };

      const pathKey = _.toLowerCase();
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      
      return {
        title: (
          <Link to={url}>{pathsMap[pathKey] || _}</Link>
        ),
        key: index.toString(),
      };
    });
    
    setBreadcrumbs(breadcrumbItems);
  }, [location]);
  
  // Updated Breadcrumb
  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
      items={[
        {
          title: <Link to="/">Главная</Link>,
          key: 'home',
        },
        ...breadcrumbs,
      ]}
    />
  );
};
