import React from "react";
import {Avatar, Flex, List} from "antd";
import moment from "moment";
import styles from "./comments.module.scss";
import {CustomAvatar} from "../avatar/avatar";
import {User} from "@prisma/client";
import {Link} from "react-router-dom";
import {Paths} from "../../paths";


type Props = {
  author: User;
  content: string;
  createdAt: string;
};

export const Comments = ({author, content, createdAt}: Props) => {
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
        <span>{moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}</span>
      </div>
    </List.Item>
  );
};
