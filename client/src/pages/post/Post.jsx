import React, {useEffect} from "react";
import {Layout} from "../../components/layout/layout";
import {useParams} from "react-router-dom";
import styles from "./Post.module.scss"
import {Flex, Tag} from "antd";
import {useGetPostQuery} from "../../api/posts";
import CustomBreadcrumb from "../../components/breadcrumb/breadcrumb";
// import {useDispatch} from "react-redux";

export const Post = () => {
  const {id} = useParams();
  const {data: post, isLoading, isError} = useGetPostQuery(id);
  // const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    if (isError) {
      console.error('Error fetching post:', isError);
    }
  }, [isError]);

  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <img className={styles.img} src={post.imageURL !== null ? post.imageURL : "/img/image-1.png"}
                 alt={''}></img>
            <Flex gap={8}>
              {post.tags.map((tag, index) => (
                <Tag key={index} className={styles.tag}>
                  {tag}
                </Tag>
              ))}
            </Flex>

            <h1 className={styles.title}>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} className={styles.content}></div>
          </>
        )}
      </Flex>
    </Layout>
  );
};
