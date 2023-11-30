import React from "react";
import { Avatar, List } from "antd";
import moment from "moment";


type Props = {
  author: string;
  content: string;
  createdAt: string;
};

export const Comments = ({ author, content, createdAt }:Props) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={'../img/avatar.jpg'} alt={author} />}
        title={<span>{author}</span>}
        description={
          <div>
            <p>{content}</p>
            <span>{moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}</span>
          </div>
        }
      />
    </List.Item>
  );
};
