import {Button, ConfigProvider, Flex, Form, Space} from "antd";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useLoginMutation, UserData} from "../../app/serivices/auth";
import {CustomInput} from "../../components/custom-input";
import {ErrorMessage} from "../../components/error-message";
import {Layout} from "../../components/layout";
import {CustomPasswordInput} from "../../components/custom-password-input";
import {selectUser} from "../../features/auth/authSlice";
import {Paths} from "../../paths";
import {isErrorWithMessage} from "../../utils/is-error-with-message";
import {inspect} from "util";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";

import {inputText, inputPassword} from "../../themes/inputs";
import {button} from "../../themes/buttons";

import styles from "./index.module.css";


export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [loginUser, loginUserResult] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/form");
    }
  }, [user, navigate]);

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      navigate("/form");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Flex style={{height:'100%'}}>
        <div className={styles.content}>
          <Form onFinish={login} className={styles.form}>
            <Flex vertical>
              <Title level={1} className={styles.title}>Мы скучали по тебе!</Title>
              <Text className={styles.subtitle}>Более 150 вопросов ждут ваших мудрых предложений!</Text>

              <CustomInput theme={inputText} type="email" name="email" placeholder="Email"/>
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
    </Layout>
  );
};
