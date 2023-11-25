import React, { useEffect } from "react";
import { Layout } from "../../components/layout/layout";
import { Link, useParams } from "react-router-dom";
import styles from "./Post.module.scss";
import { Flex, Tag } from "antd";
import { useGetPostQuery } from "../../api/posts";
import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import { Paths } from "../../paths";
// import { useDispatch } from "react-redux";

export const Post = () => {
  const { id } = useParams();
  const { data: post, isLoading, isError } = useGetPostQuery(id);
  // const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb />

        {isLoading ? (
          <p>Loading...</p>
        ) : post ? (
          <>
            {post.imageURL ? (
              <img
                className={styles.img}
                srcSet={post.imageURL}
                alt={post.title}
              />
            ) : (
              ""
            )}

            <h1 className={styles.title}>{post.title}</h1>

            <Flex>
              {post.tags &&
                post.tags.map((tag, index) => (
                  <Tag key={index} className={styles.tag}>
                    <Link to={`${Paths.search}?search=@${tag.url}`}>{tag.name}</Link>
                  </Tag>
                ))}
            </Flex>

            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className={"ql-editor " + styles.content}
            ></div>
          </>
        ) : (
          <p>Post not found</p>
        )}
      </Flex>
    </Layout>
  );
};
