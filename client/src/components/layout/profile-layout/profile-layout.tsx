import {Flex, Layout as AntLayout} from "antd";

import {Header} from "../../header/header";
import {Footer} from "../../footer/footer";
import {NavigationBar} from "../../navigationBar/navigationBar";
import {ProfileSidebar} from "../../sidebar/profile-sidebar/profile-sidebar";

import styles from "./profile-layout.module.scss";

export const ProfileLayout = ({children}: any) => {
  return (
    <>
      <Header/>
      <Flex justify={"space-between"} style={{height: '100%'}}>
        <NavigationBar/>

        <AntLayout.Content className={styles.main}>
          {children}
        </AntLayout.Content>

        <ProfileSidebar/>
      </Flex>
      <Footer/>
    </>
  );
};
