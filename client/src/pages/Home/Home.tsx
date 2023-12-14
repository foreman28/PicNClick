import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {Layout} from "../../components/layout/layout";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    navigate(Paths.forum); // перенаправление
  }, []);

  return (
    <Layout>
    </Layout>
  );
};
