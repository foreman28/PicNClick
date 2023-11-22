import React from 'react';
import {List, Space, Flex, Typography, Skeleton} from 'antd';
import styles from './skeleton-post.module.scss';

const {Paragraph} = Typography;

const SkeletonPost = () => {

  return (
    <List.Item
      className={styles.item}
      actions={[
        <Skeleton.Button active style={{minWidth: 'auto', height: '22px', width: '38px'}}/>,
        <Skeleton.Button active style={{minWidth: 'auto', height: '22px', width: '38px'}}/>,
        <Skeleton.Button active style={{minWidth: 'auto', height: '22px', width: '160px'}}/>,
      ]}
    >
      <List.Item.Meta
        description={
          <Flex gap={8} vertical>
            <Space>
              <Flex gap={16} align="center">
                <Skeleton.Avatar active style={{width: '32px', height: '32px'}}/>
                <Skeleton.Input active style={{height: '18px'}}/>
              </Flex>
            </Space>

            <Skeleton.Image active style={{width: '100%', height: '420px'}}/>

            <Flex gap={0} vertical>
              <Skeleton.Button active style={{width: '160px', height: '34px', marginBottom: '10px'}}/>

              <Skeleton.Button active style={{width: '100%', height: '20px', marginBottom: '5px'}}/>
              <Skeleton.Button active style={{width: '100%', height: '20px', marginBottom: '5px'}}/>

              <Space style={{marginTop: '1em'}}>
                <Skeleton.Button active style={{minWidth: 'auto', width: '50px', height: '30px'}}/>
                <Skeleton.Button active style={{minWidth: 'auto', width: '50px', height: '30px'}}/>
                <Skeleton.Button active style={{minWidth: 'auto', width: '50px', height: '30px'}}/>
              </Space>
            </Flex>
          </Flex>
        }
      />
    </List.Item>
  );
};

export default SkeletonPost;
