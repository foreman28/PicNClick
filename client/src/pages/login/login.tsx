import {Button, ConfigProvider, Flex, Form, Layout, Space} from "antd";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";

import {useLoginMutation, UserData} from "../../app/services/auth";
import {selectUser} from "../../features/auth/authSlice";

import {CustomInput} from "../../components/custom-input/custom-input";
import {ErrorMessage} from "../../components/error-message/error-message";
import {CustomPasswordInput} from "../../components/custom-password-input/custom-password-input";
import {Header} from "../../components/header/header";
import {Footer} from "../../components/footer/footer";

import {isErrorWithMessage} from "../../utils/is-error-with-message";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";

import {inputText, inputPassword} from "../../themes/inputs";
import {button} from "../../themes/buttons";

import styles from "./login.module.css";

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [loginUser, loginUserResult] = useLoginMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/forum");
    }
  }, [user, navigate]);

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      navigate("/forum");
    } catch (err) {
      console.log(123)
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <>
      <Header/>
      <Layout.Content className={styles.main}>
        <Flex justify={"space-between"} style={{height: '100%'}}>
          <div className={styles.content}>
            <Form onFinish={login} className={styles.form}>
              <Flex vertical>
                <Title level={1} className={styles.title}>Мы скучали по тебе!</Title>
                <Text className={styles.subtitle}>Более 150 вопросов ждут ваших мудрых предложений!</Text>

                <CustomInput theme={inputText} type="text" name="username" placeholder="Логин"/>
                <CustomPasswordInput theme={inputPassword} name="password" placeholder="Пароль"/>


                <ConfigProvider theme={button}>
                  <Button type="primary" htmlType="submit" loading={loginUserResult.isLoading}>
                    Войти
                  </Button>
                </ConfigProvider>
              </Flex>
            </Form>

            <Space direction="vertical" size="middle">
              <Text>
                Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
              </Text>
              <ErrorMessage message={error}/>
            </Space>
          </div>
          <img srcSet={"./img/login-img.png"} alt={''} className={styles.image}/>
        </Flex>
      </Layout.Content>
      <Footer/>
    </>
  );
};
