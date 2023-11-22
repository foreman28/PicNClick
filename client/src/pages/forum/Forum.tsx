import React, {useEffect} from 'react';
import {Flex, List, Skeleton, Space} from 'antd';
import {Layout} from '../../components/layout/layout';
import {useGetAllPostsQuery} from '../../api/posts';
import FeedPost from '../../components/feed-post/feed-post';

import styles from './Forum.module.scss';
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";

export const Forum = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {data: posts, isLoading, isError} = useGetAllPostsQuery();

  useEffect(() => {
    if (isError) {
      console.error('Error fetching posts:', isError);
    }
  }, [isError]);

  const SkeletonPost = () => (
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

  return (
    <Layout>
      <Flex gap={12} vertical>

        <CustomBreadcrumb />
        {/*<Title level={1}>Форум</Title>*/}

        {isLoading ? (
          <Flex vertical gap="12px">
            <List
              itemLayout="vertical"
              size="large"
              dataSource={[1, 2, 3, 4]}
              renderItem={() => <SkeletonPost/>}
            />
          </Flex>
        ) : (
          <Flex vertical gap="12px">
            <List
              itemLayout="vertical"
              size="large"
              dataSource={posts}
              renderItem={(item) => <FeedPost post={item}/>}
              locale={{emptyText: 'Пусто'}}
            />
          </Flex>
        )}
      </Flex>
    </Layout>
  );
};

