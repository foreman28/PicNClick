import {useEffect, useState} from "react";
import {Layout} from "../../components/layout/layout";
import {Link, useParams} from "react-router-dom";
import styles from "./Post.module.scss";
import {Button, Flex, Form, List, Tag, Typography} from "antd";
import {useGetPostQuery} from "../../api/posts";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import {Paths} from "../../paths";
import Comments from "../../components/comments/comments";
import {CustomTextarea} from "../../components/custom-textarea/custom-textarea";
import {CustomButton} from "../../components/custom-button/custom-button";
// import { useDispatch } from "react-redux";

const {Title} = Typography;

export const Post = () => {
  const {id}: any = useParams();
  const {data: post, isLoading, isError}: any = useGetPostQuery(id);
  // const dispatch = useDispatch();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
  
  // const [comment, setComment] = useState("");
  //
  // const handleCommentChange = (e:any) => {
  //   setComment(e.target.value);
  // };
  //
  // const handleAddComment = () => {
  //   // Здесь вы можете добавить логику для отправки комментария на сервер
  //   // Например, вызвать функцию из вашего Redux-хранилища или использовать API для отправки комментария на сервер
  //   // В этом примере используется просто вывод комментария в консоль
  //   console.log("Добавлен комментарий:", comment);
  //   setComment(""); // Очистить поле комментария после отправки
  // };
  
  return (<Layout>
    <Flex gap={12} vertical>
      <CustomBreadcrumb/>
      
      {isLoading ? (<p></p>) : post ? (
        <>
          {post.imageURL ? (
            <img
              className={styles.img}
              srcSet={post.imageURL}
              alt={post.title}
              width={982}
              height={420}
            />) : (
            <div
              className={styles.img}
            />)
          }
          
          <h1 className={styles.title}>{post.title}</h1>
          
          <Flex>
            {post.tags && post.tags.map((tag: any, index: any): any => (
              <Tag key={index} className={styles.tag}>
                <Link to={`${Paths.search}?search=@${tag.url}`}>{tag.name}</Link>
              </Tag>))}
          </Flex>
          
          <div
            dangerouslySetInnerHTML={{__html: post.content}}
            className={"ql-editor " + styles.content}
          ></div>
          
          <Flex vertical gap={12} className={styles.comments}>
            <Title>Comments:</Title>
            <Form>
              <CustomTextarea name={"comments"} placeholder="Напишите комментарий"/>
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
                locale={{ emptyText: 'Нет комментариев' }}
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