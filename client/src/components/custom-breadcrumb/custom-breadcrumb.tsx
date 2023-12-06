import { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const CustomBreadcrumb = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);
  
  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
      const pathsMap:any = {
        forum: 'Форум',
        'add-post': 'Добавить пост',
        search: 'Поиск',
        tags: 'Теги',
        users: 'Пользователи',
        profile: 'Профиль',
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

export default CustomBreadcrumb;
