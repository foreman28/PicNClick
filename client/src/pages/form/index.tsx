import React, {useEffect} from "react";
import {Button} from "antd";
// import { CustomButton } from "../../components/custom-button";

import {Paths} from "../../paths";
import {useNavigate} from "react-router-dom";
import {Layout} from "../../components/layout";
import {selectUser} from "../../features/auth/authSlice";
import {useSelector} from "react-redux";

export const Form = () => {
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
      <Button type="primary" onClick={gotToAddUser}>
        Добавить
      </Button>

    </Layout>
  );
};
