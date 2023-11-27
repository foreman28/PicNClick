import {Flex, Tag} from 'antd';
import {Link} from "react-router-dom";
import {Paths} from "../../paths";

import styles from './custom-tag.module.scss';

type Props = {
  post: any;
};

export const CustomTag = ({
                            post
                          }: Props) => {

  return (
    <Flex>
      {
        post.tags && post.tags.map((tag: any, index: any) => (
          <Tag key={index} className={styles.tag}>
            <Link to={`${Paths.search}?q=@${tag.url}`}>{tag.name}</Link>
          </Tag>
        ))
      }
    </Flex>
  );
};
