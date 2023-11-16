import {User} from "@prisma/client";
import {Flex, Form, Layout, Space} from "antd";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../../app/serivices/auth";

import {CustomInput} from "../../components/custom-input/custom-input";
import {ErrorMessage} from "../../components/error-message/error-message";
import { CustomPasswordInput } from "../../components/custom-password-input/custom-password-input";
import {selectUser} from "../../features/auth/authSlice";
import {Paths} from "../../paths";
import {isErrorWithMessage} from "../../utils/is-error-with-message";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";

import {inputPassword, inputText} from "../../themes/inputs";
import {button} from "../../themes/buttons";

import {Header} from "../../components/header/header";
import {Footer} from "../../components/footer/footer";

import styles from "./register.module.css";
import {CustomButton} from "../../components/custom-button/button";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/forum");
    }
  }, [user, navigate]);

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

      navigate("/forum");
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
    <>
      <Header/>
      <Layout.Content className={styles.main}>
      <Flex style={{height:'100%'}}>
        <div className={styles.content}>
          <Form onFinish={register} className={styles.form}>
            <Flex vertical>
              <Title level={1} className={styles.title}>Мы скучали по тебе!</Title>
              <Text className={styles.subtitle}>Более 150 вопросов ждут ваших мудрых предложений!</Text>

              <CustomInput theme={inputText} type="text" name="username" placeholder="Имя"/>
              <CustomInput theme={inputText} type="email" name="email" placeholder="Email"/>
              <CustomPasswordInput theme={inputPassword} name="password" placeholder="Пароль"/>
              <CustomPasswordInput theme={inputPassword} name="confirmPassword" placeholder="Пароль"/>

              <CustomButton theme={button} type="primary" htmlType="submit">
                Зарегистрироваться
              </CustomButton>
            </Flex>
          </Form>

          <Space direction="vertical" size="middle">
            <Text>
              Уже зарегистрированы? <Link to={Paths.login}>Войдите</Link>
            </Text>
            <ErrorMessage message={error}/>
          </Space>
        </div>
        <img srcSet={"./img/register-img.png"} alt={''} className={styles.image}/>
      </Flex>
      </Layout.Content>
      <Footer/>
    </>
  );
};
