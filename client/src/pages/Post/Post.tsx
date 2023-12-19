import {useEffect} from "react";
import {Layout} from "../../components/layout/layout";
import {useParams} from "react-router-dom";
import {Flex, Typography} from "antd";
import {useGetPostQuery} from "../../api/posts";
import {CustomBreadcrumb} from "../../components/custom-breadcrumb/custom-breadcrumb";
import {CustomTag} from "../../components/custom-tag/custom-tag";
import {Comments} from "../../components/comments/comments";

import styles from "./Post.module.scss";


const {Title, Text} = Typography;
// import { Link, Element } from "react-scroll";


export const Post = () => {
  const {id}: any = useParams();
  const {data: post, isLoading: isLoadingPost, refetch}: any = useGetPostQuery(id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        
        {isLoadingPost ? (<p></p>) : post ? (
          <>
            {`${process.env.REACT_APP_URL}${post.image}` ? (
              <img
                className={styles.img}
                srcSet={`${process.env.REACT_APP_URL}${post.image}`}
                alt={post.title}
                width={982}
                height={420}
              />) : (
              <div
                className={styles.img}
              />)
            }
            
            <Title className={styles.title}>{post.title}</Title>
            
            <CustomTag post={post}/>
            
            <div
              dangerouslySetInnerHTML={{__html: post.content}}
              className={"ql-editor " + styles.content}
            />
            
            <Comments post={post} refetch={refetch}/>
          </>
        ) : (
          <p>Запись не найдена</p>
        )}
      </Flex>
    </Layout>
  );
};
