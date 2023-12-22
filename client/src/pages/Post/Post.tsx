import React, {useEffect} from "react";
import {Layout} from "../../components/layout/layout";
import {useNavigate, useParams} from "react-router-dom";
import {Dropdown, Flex, MenuProps, message, Typography} from "antd";
import {useGetPostQuery, useRemovePostMutation} from "../../api/posts";
import {CustomBreadcrumb} from "../../components/custom-breadcrumb/custom-breadcrumb";
import {CustomTag} from "../../components/custom-tag/custom-tag";
import {Comments} from "../../components/comments/comments";

import styles from "./Post.module.scss";
import {MoreOutlined} from "@ant-design/icons";
import copy from "clipboard-copy";
import {Paths} from "../../paths";
import {useAppSelector} from "../../hooks/hooks";
import {selectUser} from "../../features/auth/authSlice";


const {Title, Text} = Typography;

export const Post = () => {
  const {id}: any = useParams();
  const {data: post, isLoading: isLoadingPost, refetch}: any = useGetPostQuery(id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const [removePost] = useRemovePostMutation()
  
  const items: MenuProps['items'] =
    (user?.id === post?.authorId || user?.role === "ADMIN") ? [
      {
        key: '1',
        label: "Поделиться",
        onClick: () => {
          message.success("Скопировано")
          copy(`${process.env.REACT_APP_CLIENT_URL}${Paths.forum}/${post.url}`)
        }
      },
      {
        key: '2',
        label: 'Изменить',
        onClick: () => {
          navigate(`${Paths.editPost}/${post.url}`)
        }
      },
      {
        key: '3',
        label: 'Удалить',
        onClick: () => {
          removePost(post.id)
          refetch()
        },
        danger: true
      }
    ] : [
      {
        key: '1',
        label: "Поделиться",
        onClick: () => {
          console.log("Поделиться")
          copy(`${process.env.REACT_APP_CLIENT_URL}${Paths.forum}/${post.url}`)
        }
      }
    ];
  
  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        
        {isLoadingPost ? (<p></p>) : post ? (
          <>
            <div className={styles.img_box}>
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
              <Dropdown
                menu={{items}}
                trigger={['click']}
                placement="bottomRight"
                className={styles.dropdown}
              >
                <MoreOutlined className={styles.icon}/>
              </Dropdown>
            </div>

            
            <Title className={styles.title}>{post.title}</Title>
            
            <CustomTag post={post}/>
            
            <div className={"ql-snow " + styles.item}>
              <div
                dangerouslySetInnerHTML={{__html: post.content}}
                className={"ql-editor " + styles.content}
              />
            </div>
            
            <Comments post={post} refetch={refetch}/>
          </>
        ) : (
          <p>Запись не найдена</p>
        )}
      </Flex>
    </Layout>
  );
};
