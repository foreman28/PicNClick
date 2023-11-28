import {Flex, Tag} from 'antd';
import {Link} from "react-router-dom";
import {Paths} from "../../paths";

import styles from './custom-tag.module.scss';

type Props = {
  style?: React.CSSProperties;
  post: any;
};

export const CustomTag = ({
                            style,
                            post
                          }: Props) => {
  return (
    <Flex>
      {post.tags &&
        post.tags.map((tag: any, index: any) => (
          <Tag key={index} className={styles.tag} style={style}>
            <Link to={`${Paths.search}?q=@${tag.url}`}>{tag.name}</Link>
          </Tag>
        ))}
    </Flex>
  );
};
