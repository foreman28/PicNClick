import React from "react";
import { Avatar, List } from "antd";
import moment from "moment";

const Comment = ({ author, content, createdAt }) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="" alt={author} />}
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

export default Comment;