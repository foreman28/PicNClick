import {useEffect} from 'react';
import {Flex, Typography} from "antd";
import {Layout} from "../../components/layout/layout";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";

import {useGetAllUsersQuery} from "../../api/auth";
import UserItem from "../../components/user-item/user-item";
import {CustomTitle} from "../../components/custom-title/custom-title";

import styles from "./Users.module.scss";

const {Title, Text} = Typography;

export const Users = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {data: users, isLoading, isError} = useGetAllUsersQuery();
  // console.log(users)
  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        
        <CustomTitle title={"Пользователи"} level={1}/>
        
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {users && users.map(({ id, ...user }:any) => (
              <UserItem key={id} user={user} />
            ))}
          </>
        )}
      </Flex>
    </Layout>
  );
};
