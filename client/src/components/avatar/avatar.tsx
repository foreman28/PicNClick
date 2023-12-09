import {Avatar} from "antd";
import styles from "./avatar.module.scss";
import {Link} from "react-router-dom";
import {Paths} from "../../paths";

type Props = {
  data: any
  width?: number
  height?: number
}

export const CustomAvatar = (
  {
    data,
    width = 32,
    height = 32
  }: Props) => {
  
  return (
    <Link to={`${Paths.profile}/${data.author.username}`}>
      <img
        className={styles.avatar}
        srcSet={data.author.avatarURL !== null ?
          `${process.env.REACT_APP_URL}${data.author.avatarURL}`
          :
          `${process.env.REACT_APP_URL}/uploads/stubs/stubs-avatar.jpg`
        }
        alt={data.username}
        width={width}
        height={height}
      />
    </Link>
  );
};
