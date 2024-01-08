import {Flex, Layout as AntLayout} from "antd";

import {Header} from "../../header/header";
import {Footer} from "../../footer/footer";
import {NavigationBar} from "../../navigationBar/navigationBar";
import {ProfileSidebar} from "../../sidebar/profile-sidebar/profile-sidebar";

import styles from "./profile-layout.module.scss";

import {useLayoutEffect, useState} from "react";

export const ProfileLayout = ({children}: any) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const checkWindowWidth = () => {
    const screenWidth = window.innerWidth;
    const shouldHideSidebar = screenWidth <= 1440;
    
    if (shouldHideSidebar !== isSidebarVisible) {
      setSidebarVisible(shouldHideSidebar);
    }
  };
  
  useLayoutEffect(() => {
    checkWindowWidth();
    window.addEventListener('resize', checkWindowWidth);
    
    return () => {
      window.removeEventListener('resize', checkWindowWidth);
    };
  }, [isSidebarVisible]);
  
  return (
    <>
      <Header/>
      <Flex justify={"space-between"} style={{height: '100%'}}>
        <NavigationBar/>

        <AntLayout.Content className={styles.main}>
          {children}
        </AntLayout.Content>

        {isSidebarVisible ? null : <ProfileSidebar />}
      </Flex>
      <Footer/>
    </>
  );
};
