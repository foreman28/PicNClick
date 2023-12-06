import {List, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {Paths} from "../../paths";

import styles from './user-item.module.scss';

const {Paragraph} = Typography;

const UserItem = ({user}) => {

  return (
    <div
      style={{padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}
      className={styles.item}
      key={user.id}>

      <Link to={`${Paths.profile}/${user.username}`} className={styles.title}>
        <img
          src={`${process.env.REACT_APP_URL}${user.avatarURL}`}
          alt={`${user.username}`}
          width={48}
          height={48}
        />
      </Link>
      <Link to={`${Paths.profile}/${user.username}`} className={styles.title}>
        {user.username}
      </Link>
      {/*<Paragraph className={styles.description} ellipsis={{rows: 3, expandable: true, symbol: 'Раскрыть'}}>*/}
      {/*  {user.description}*/}
      {/*</Paragraph>*/}
      {/*<div className={styles.posts}>*/}
      {/*  {user.posts.length} {user.posts.length > 1 ? 'Темы' : 'Тема'}*/}
      {/*</div>*/}
    </div>
  );
};

export default UserItem;
