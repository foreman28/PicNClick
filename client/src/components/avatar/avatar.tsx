import {Avatar} from "antd";

type Props = {
  post: any
}

export const CustomAvatar = ({post}: Props) => {
  return (
    <Avatar
      src={post.author.avatarURL !== null ?
        `${process.env.REACT_APP_URL}${post.author.avatarURL}`
        :
        `${process.env.REACT_APP_URL}/uploads/stubs/stubs-avatar.jpg`
      }
    />
  );
};
