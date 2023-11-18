import {Flex, Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logout, selectUser} from "../../features/auth/authSlice";

import {button, button2} from "../../themes/buttons";

import style from "./header.module.scss";
import {CustomButton} from "../custom-button/button";
import SearchComponent from "../custom-search/search";
import {search} from "../../themes/search";

// interface post {
//   id: number;
//   title: string;
//   content: string;
// }

export const Header = () => {
  const user = useSelector(selectUser);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    // navigate("/login");
  };


  return (
    <Layout.Header className={style.header} style={{height: 'auto'}}>
      <Flex justify={"space-between"} align={"center"} className={style.header_container}>

        <Link to="/" className={style.logo_text}>
          <img srcSet={"../../../logo.svg"} alt={"PicNClick"}/>
          <span>Pic<span>&</span>Click</span>
        </Link>


        <SearchComponent theme={search}/>

        {user ? (
          <CustomButton theme={button2} type="primary" onClick={onLogoutClick}>
            Выйти
          </CustomButton>
        ) : (
          <Flex gap={16}>
            <Link to="/register" style={{lineHeight: 0}}>
              <CustomButton theme={button} type="primary">
                Зарегистрироваться
              </CustomButton>
            </Link>

            <Link to="/login" style={{lineHeight: 0}}>
              <CustomButton theme={button2} type="primary">
                Войти
              </CustomButton>
            </Link>
          </Flex>
        )}
      </Flex>

    </Layout.Header>
  );
};
