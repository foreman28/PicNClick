import {Flex} from "antd";
import {Layout} from "../../components/layout/layout";
import styles from "./search.module.scss";
import {SearchMain} from "../../components/search-main/search";

export const Search = () => {


  return (
    <Layout>
      <Flex className={styles.main} vertical gap={"12px"}>
        <h1>Search Page</h1>
        <SearchMain />
      </Flex>
    </Layout>
  );
};
