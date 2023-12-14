import React from "react";
import {Flex, Form, List, Typography} from "antd";
import {Comment} from "../comment/comment";
import styles from "../../pages/Post/Post.module.scss";
import {CustomTextarea} from "../custom-textarea/custom-textarea";
import {button} from "../../themes/buttons";
import {useAddCommentMutation} from "../../api/comment";
import {CustomButton} from "../custom-button/custom-button";

const {Title} = Typography;

type Props = {
  post: any;
  refetch: any;
};

export const Comments = ({post, refetch}: Props) => {
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
  
  
  const [addComment, {isLoading: isLoadingComment}] = useAddCommentMutation();
  
  const onFinish = async (data: any) => {
    try {
      data = {
        ...data,
        forumPostId: post.id
      }
      await addComment(data);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Flex vertical gap={12} className={styles.comments} id={'comments'}>
      <Title>Сообщения:</Title>
      <Form onFinish={onFinish}>
        <CustomTextarea
          name={"content"}
          placeholder={"Напишите сообщение"}
          modules={modules}
          formats={formats}
        />
        
        <CustomButton
          type={"primary"}
          htmlType={"submit"}
          loading={isLoadingComment}
          theme={button}
        >
          Добавить пост
        </CustomButton>
      
      </Form>
      
      {post.comments && (
        <List
          itemLayout="horizontal"
          dataSource={post.comments}
          renderItem={(comment: any) => (
            <Comment
              key={comment.id}
              author={comment.user}
              content={comment.content}
              createdAt={comment.createdAt}
            />
          )}
          locale={{emptyText: "Нет сообщений"}}
        />
      )}
    </Flex>
  );
};
