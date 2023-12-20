import {Flex, List, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {Paths} from "../../paths";

import styles from './card-item.module.scss';
import React from "react";


type Props = {
  color: string,
  count: number | undefined,
  icon: React.ReactNode;
}

const CardItem = (
  {
    color,
    count = 0,
    icon
  }: Props) => {
  
  return (
    <Flex
      align={"center"}
      style={{
        background: color,
        boxShadow: `2px 1px 5px 0 ${color}`
    }}
      className={styles.item}
    >
      <span className={styles.title}>{count}</span>
      
      <div className={styles.icon}>{icon}</div>
      
      {/*<Link to={`${Paths.search}?q=@${tag.url}`} className={styles.title}>*/}
      {/*  #{tag.name}*/}
      {/*</Link>*/}
      {/*<Paragraph className={styles.description} ellipsis={{rows: 3, expandable: true, symbol: 'Раскрыть'}}>*/}
      {/*  {tag.description}*/}
      {/*</Paragraph>*/}
      {/*<div className={styles.posts}>*/}
      {/*  {tag.posts.length} {tag.posts.length > 1 ? 'Темы' : 'Тема'}*/}
      {/*</div>*/}
    </Flex>
  );
};

export default CardItem;
