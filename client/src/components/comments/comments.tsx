import React, {useEffect, useState} from "react";
import {Flex, Form, List, Typography} from "antd";
import {Comment} from "../comment/comment";
import styles from "../../pages/Post/Post.module.scss";
import {CustomTextarea} from "../custom-textarea/custom-textarea";
import {button} from "../../themes/buttons";
import {useAddCommentMutation} from "../../api/comment";
import {CustomButton} from "../custom-button/custom-button";
import {CommentsWithUser, ForumPostWithAuthorAndComments} from "../../types";

const {Title} = Typography;

type Props = {
  post: ForumPostWithAuthorAndComments;
  refetch: any;
};

export const Comments = ({post, refetch}: Props) => {
  // const modules = {
  //   toolbar: [
  //     [{'header': [2, 3, false]}],
  //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //     [{'list': 'ordered'}, {'list': 'bullet'}],
  //     [
  //       'link',
  //       // 'image',
  //       'video'
  //     ],
  //     [{'color': []}, {'background': []}],
  //     ['clean'],
  //   ],
  // };
  
  const [form] = Form.useForm();
  const [addComment, {isLoading: isLoadingComment}] = useAddCommentMutation();
  
  const onFinish = async (data: any) => {
    try {
      if (data.content.trim() !== "<p><br></p>") {
        data = {
          ...data,
          forumPostId: post.id
        }
        await addComment(data);
        refetch();
        form.resetFields(['content']);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  // const [content, setContent] = useState(""); // Textarea

  return (
    <Flex vertical gap={12} className={styles.comments} id={'comments'}>
      <Title>Сообщения:</Title>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <CustomTextarea
          // defaultValueTextarea={content}
          name={"content"}
          required={false}
          placeholder={"Напишите сообщение"}
          // modules={modules}
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
          renderItem={(comment) => (
            <Comment
              key={comment.id}
              comment={comment as CommentsWithUser}
              refetch={refetch}
              // author={comment.author}
              // content={comment.content}
              // createdAt={comment.createdAt}
            />
          )}
          locale={{emptyText: "Нет сообщений"}}
        />
      )}
    </Flex>
  );
};
