import React from "react";
import {Flex, Typography} from 'antd';

import styles from './card-item.module.scss';

const {Paragraph} = Typography;

type Props = {
  title: string,
  count: number | undefined,
  color: string,
  icon: React.ReactNode;
}

const CardItem = (
  {
    title,
    count = 0,
    color,
    icon
  }: Props) => {
  
  return (
    <Flex
      align={"center"}
      justify={"space-between"}
      gap={12}
      style={{
        background: color,
        boxShadow: `2px 1px 5px 0 ${color}`
    }}
      className={styles.item}
    >
      <Flex vertical>
        <span className={styles.count}>{count}</span>
        <Paragraph ellipsis={{rows: 2}} className={styles.title}>{title}</Paragraph>
      </Flex>

      <div className={styles.icon}>{icon}</div>
    </Flex>
  );
};

export default CardItem;
