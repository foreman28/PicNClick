import React, {useState, useEffect} from 'react';
import {Breadcrumb} from 'antd';
import {Link, useLocation} from 'react-router-dom';

const CustomBreadcrumb: React.FC = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
      const pathsMap: { [key: string]: string } = {
        forum: 'Форум',
        'add-post': 'Добавить пост',
        search: 'Поиск',
        tags: 'Теги',
        users: 'Пользователи',
        // Добавьте другие пути и их локализованные названия
      };

      const pathKey = _.toLowerCase();
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

      return (
        <Breadcrumb.Item key={index}>
            <Link to={url}>{pathsMap[pathKey] || _}</Link>
        </Breadcrumb.Item>
      );
    });

    setBreadcrumbs(breadcrumbItems);
  }, [location]);

  return (
    <Breadcrumb style={{margin: '16px 0'}}>
      <Breadcrumb.Item>
        <Link to="/">Главная</Link>
      </Breadcrumb.Item>
      {breadcrumbs}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
