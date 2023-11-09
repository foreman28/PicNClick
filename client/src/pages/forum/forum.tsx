import React, {useEffect} from "react";
import {Button, Flex} from "antd";
// import { CustomButton } from "../../components/custom-button";

import {Paths} from "../../paths";
import {useNavigate} from "react-router-dom";
import {Layout} from "../../components/layout/layout";
import {selectUser} from "../../features/auth/authSlice";
import {useSelector} from "react-redux";
import {inspect} from "util";
import styles from "./forum.module.css";

export const Forum = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const gotToAddUser = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
      <Flex className={styles.main}>
        <Button type="primary" onClick={gotToAddUser}>
          Добавить
        </Button>
        123

      </Flex>
    </Layout>
  );
};
