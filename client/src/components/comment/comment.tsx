import {Dropdown, Flex, List, MenuProps} from "antd";
import {CustomAvatar} from "../avatar/avatar";
import {Link} from "react-router-dom";
import {Paths} from "../../paths";
import TimeDisplay from "../time-display/time-display";

import styles from "./comment.module.scss";
import {MoreOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import {useRemoveCommentMutation} from "../../api/comment";
import {CommentsWithUser} from "../../types";
import {useEffect} from "react";
// import {PrefetchOptions} from "@reduxjs/toolkit/query";


type Props = {
  comment: CommentsWithUser;
  refetch: any
};

export const Comment = ({comment, refetch}: Props) => {
  const user = useSelector(selectUser)
  const [removeComment] = useRemoveCommentMutation()
  
  const items: MenuProps['items'] =
    (user?.id === comment.userId || user?.role === "ADMIN") ? [
      // {
      //   key: '2',
      //   label: 'Изменить',
      //   onClick: () => console.log("Изменить")
      // },
      {
        key: '3',
        label: 'Удалить',
        onClick: () => {
          removeComment(comment.id)
            .then(() => {
              refetch();
            })
            .catch((error) => {
              console.error('Ошибка при удалении комментария', error);
            });
        },
        danger: true
      }
    ] : undefined;
  
  return (
    <List.Item>
      <div style={{width: "100%"}}>
        <Flex justify={"space-between"}>
          <Flex gap={12} align={"center"}>
            <CustomAvatar user={comment.user}/>
            <Flex vertical>
              <Link to={`${Paths.profile}/` + comment.user.username}
                    className={styles.username}>{comment.user.username}</Link>
            </Flex>
          </Flex>
          
          {items ?
            <Dropdown menu={{items}} trigger={['click']} placement="bottomRight">
              <MoreOutlined className={styles.icon}/>
            </Dropdown>
            :
            undefined}
        </Flex>
        <div className={"ql-snow"}>
          <div
            dangerouslySetInnerHTML={{__html: comment.content}}
            className={"ql-editor " + styles.content}
            style={{minHeight: "auto"}}
          />
        </div>
        <TimeDisplay createdAt={comment.createdAt}/>
      </div>
    </List.Item>
  );
};
