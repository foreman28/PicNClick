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
          <Button type="primary">
            Добавить
          </Button>
          <Button type="primary">
            asd
          </Button>
        </Space>

        <ForumFeed/>
      </Flex>
    </Layout>
  );
};
