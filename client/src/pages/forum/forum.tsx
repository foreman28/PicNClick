import React, {useEffect} from "react";
import {Button, Flex, Space} from "antd";
// import { CustomButton } from "../../components/custom-button";

// import {Paths} from "../../paths";
import {useNavigate} from "react-router-dom";
import {Layout} from "../../components/layout/layout";
import {selectUser} from "../../features/auth/authSlice";
import {useSelector} from "react-redux";
// import {inspect} from "util";
import styles from "./forum.module.css";
import ForumFeed from "../../components/forum-feed/forum-feed";
import {CustomButton} from "../../components/custom-button/button";
import {button, button2} from "../../themes/buttons";

export const Forum = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  // const gotToAddUser = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
      <Flex className={styles.main} vertical gap={"12px"}>
        <Space>
          <CustomButton theme={button} type="primary">
            Добавить
          </CustomButton>
          <CustomButton theme={button} type="primary">
            asd
          </CustomButton>
        </Space>

        <ForumFeed/>
      </Flex>
    </Layout>
  );
};
