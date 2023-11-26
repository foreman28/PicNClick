import {Flex, Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logout, selectUser} from "../../features/auth/authSlice";

import {button, button2} from "../../themes/buttons";

import {CustomButton} from "../custom-button/custom-button";
import SearchComponent from "../custom-search/search";
import {search} from "../../themes/search";

import styles from "./header.module.scss";

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
    <Layout.Header className={styles.header} style={{height: 'auto'}}>
      <Flex justify={"space-between"} align={"center"} className={styles.header_container}>

        <Flex gap={16} align={"center"} className={styles.logo_content}>
          <Link to="/" className={styles.logo}>
            <img srcSet={`${process.env.PUBLIC_URL}/logo.svg`} width={40} height={40} alt={"PicNClick"}/>
          </Link>
          <Link to="/">
            <span>Pic<span>&</span>Click</span>
          </Link>
        </Flex>


        <SearchComponent theme={search}/>

        <Flex className={styles.btns} justify={"end"}>
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

      </Flex>

    </Layout.Header>
  );
};
