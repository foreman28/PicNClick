import {Link} from "react-router-dom";
import {Paths} from "../../paths";
import {User} from "@prisma/client";

import styles from "./avatar.module.scss";

type Props = {
  user: User
  width?: number
  height?: number
}

export const CustomAvatar = (
  {
    user,
    width = 32,
    height = 32
  }: Props) => {
  return (
    <Link to={`${Paths.profile}/${user.username}`}>
      <img
        className={styles.avatar}
        srcSet={user.avatarURL !== null ?
          `${process.env.REACT_APP_URL}${user.avatarURL}`
          :
          `${process.env.REACT_APP_URL}/uploads/stubs/stubs-avatar.jpg`
        }
        alt={user.username}
        width={width}
        height={height}
        loading={"lazy"}
      />
    </Link>
  );
};
