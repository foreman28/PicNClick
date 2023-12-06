import {useEffect} from "react";
import {Layout} from "../../components/layout/layout";
import {useParams} from "react-router-dom";
import {Flex, Form, List, Typography} from "antd";
import {useGetPostQuery} from "../../api/posts";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";

import {Comments} from "../../components/comments/comments";
import {CustomTextarea} from "../../components/custom-textarea/custom-textarea";
import {CustomButton} from "../../components/custom-button/custom-button";
import {CustomTag} from "../../components/custom-tag/custom-tag";

import styles from "./Post.module.scss";

const {Title} = Typography;

export const Post = () => {
  const {id}: any = useParams();
  const {data: post, isLoading}: any = useGetPostQuery(id);
  
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [post]);
  
  // console.log(post)

  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
  ];
  
  return (<Layout>
    <Flex gap={12} vertical>
      <CustomBreadcrumb/>
      
      {isLoading ? (<p></p>) : post ? (
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
          
          <h1 className={styles.title}>{post.title}</h1>
          
          <CustomTag post={post}/>
          
          
          <div
            dangerouslySetInnerHTML={{__html: post.content}}
            className={"ql-editor " + styles.content}
          ></div>
          
          <Flex vertical gap={12} className={styles.comments} id={'comments'}>
            <Title>Сообщения:</Title>
            <Form>
              <CustomTextarea
                name={"comments"}
                placeholder={"Напишите сообщение"}
                modules={modules}
                formats={formats}
              />
              <CustomButton type="primary">
                Добавить комментарий
              </CustomButton>
            </Form>
            
            {post.comments && (
              <List
                itemLayout="horizontal"
                dataSource={post.comments}
                renderItem={(comment: any) => (
                  <Comments
                    key={comment.id}
                    author={comment.user.username}
                    content={comment.content}
                    createdAt={comment.createdAt}
                  />
                )}
                locale={{emptyText: "Нет сообщений"}}
              />
            )}
          </Flex>
        </>
      ) : (
        <p>Запись не найдена</p>
      )}
    </Flex>
  </Layout>);
};
