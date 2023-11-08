import {Button, ConfigProvider, Layout, Space, Typography} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../features/auth/authSlice";

import { button, button2 } from "../../themes/buttons";

import style from "./index.module.css";
export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={style.header} style={{height: 'auto'}}>
      <Layout className={style.header_container}>
          <Link to="/" className={style.logo_text}>
            <img srcSet={"../../../logo.svg"} alt={"PicNClick"}/>
            <span>Pic<span>&</span>Click</span>
          </Link>

        <span className={style.title}>Asd</span>

        {user ? (
            <ConfigProvider theme={button} >
                <Button type="primary" onClick={onLogoutClick} >
                  Выйти
                </Button>
            </ConfigProvider>
        ) : (
            <div className={style.header_items} >
              <Link to="/register" className={style.header_item} style={{lineHeight: 0}}>
                  <ConfigProvider theme={button} >
                    <Button type="primary">
                      Зарегистрироваться
                    </Button>

                  </ConfigProvider>
              </Link>

              <Link to="/login" className={style.header_item} style={{lineHeight: 0}}>
                  <ConfigProvider theme={button2} >
                    <Button type="primary">
                      Войти
                    </Button>
                  </ConfigProvider>
              </Link>
            </div>
        )}
      </Layout>

    </Layout.Header>
  );
};
