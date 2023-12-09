import {useEffect} from 'react';
import {Flex} from "antd";
import {Layout} from "../../components/layout/layout";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";

import {useGetAllUsersQuery} from "../../api/auth";
import TagItem from "../../components/tag-item/tag-item";
import UserItem from "../../components/user-item/user-item";

import styles from "./Users.module.scss";

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
        {/*<Title level={1}>Пользователи</Title>*/}

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
