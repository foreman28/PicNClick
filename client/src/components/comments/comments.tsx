import React from "react";
import {Avatar, Flex, List} from "antd";
import moment from "moment";
import styles from "./comments.module.scss";
import {CustomAvatar} from "../avatar/avatar";
import {User} from "@prisma/client";
import {Link} from "react-router-dom";
import {Paths} from "../../paths";
import {format, formatDistanceToNow} from "date-fns";
import {ru} from "date-fns/locale";


type Props = {
  author: User;
  content: string;
  createdAt: string;
};

export const Comments = ({author, content, createdAt}: Props) => {
  const createdDate: any = new Date(createdAt);
  const newDate: any = new Date();

  const formattedTimestamp =
    newDate - createdDate < 24 * 60 * 60 * 1000
      ? formatDistanceToNow(createdDate, {locale: ru, addSuffix: true})
      : format(createdDate, 'MMMM d, yyyy HH:mm', {locale: ru});

  return (
    <List.Item>
      <div>
        <Flex gap={12} align={"center"}>
          <CustomAvatar user={author}/>
          <Flex vertical>
            <Link to={`${Paths.profile}/` + author.username} className={styles.username}>{author.username}</Link>
          </Flex>
        </Flex>
        <div
          dangerouslySetInnerHTML={{__html: content}}
          className={"ql-editor " + styles.content}
          style={{minHeight: "auto"}}
        />
        <span>{formattedTimestamp}</span>
      </div>
    </List.Item>
  );
};
