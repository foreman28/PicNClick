import {useEffect} from 'react';
import {Button, ConfigProvider, Flex, Form} from 'antd';
import {Layout} from '../../components/layout/layout';
import {useAddPostMutation} from '../../api/posts';

import CustomBreadcrumb from "../../components/breadcrumb/breadcrumb";
import {CustomInput} from "../../components/custom-input/custom-input";
import {CustomButton} from "../../components/custom-button/button";
import {button} from "../../themes/buttons";

import styles from './Add-post.module.scss';
import {CustomTextarea} from "../../components/custom-textarea/custom-textarea";

export const AddPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [addPost, {isLoading}] = useAddPostMutation();
  const onSubmit = async (data: any) => {
    console.log(data)
    data = {
      ...data,
      tags: ['asd']   // изменить
    }

    try {
      await addPost(data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Flex gap={12} vertical>
        <CustomBreadcrumb/>
        <Form
          className={styles.item}
          layout={"vertical"}
          onFinish={onSubmit}
        >
          <Flex vertical gap={4}>
            <CustomInput name={"title"} placeholder={"Заголовок"}/>
            <CustomInput name={"description"} placeholder={"Краткое описание"}/>
            
            {/*<CustomInput name={"content"} placeholder={"Содержание"}/>*/}

            <CustomTextarea name={"content"} />

            <ConfigProvider theme={button}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Добавить пост
              </Button>
            </ConfigProvider>

            {/*<CustomButton htmlType="submit">*/}
            {/*  */}
            {/*</CustomButton>*/}
          </Flex>
        </Form>

        {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
        {/*  <label htmlFor="title">Заголовок:</label>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    // name="title"*/}
        {/*    id="title"*/}
        {/*    {...register('title', { required: 'Это поле обязательное' })}*/}
        {/*  />*/}
        {/*  {errors.title && <p>{errors.title.message}</p>}*/}

        {/*  <label htmlFor="content">Содержание:</label>*/}
        {/*  <textarea*/}
        {/*    // name="content"*/}
        {/*    id="content"*/}
        {/*    {...register('content', { required: 'Это поле обязательное' })}*/}
        {/*  />*/}
        {/*  {errors.content && <p>{errors.content.message}</p>}*/}

        {/*  <label htmlFor="tags">Теги:</label>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    // name="tags"*/}
        {/*    id="tags"*/}
        {/*    {...register('tags', { required: 'Это поле обязательное' })}*/}
        {/*  />*/}
        {/*  {errors.tags && <p>{errors.tags.message}</p>}*/}

        {/*  <button type="submit" disabled={isLoading}>*/}
        {/*    {isLoading ? 'Добавление...' : 'Добавить пост'}*/}
        {/*  </button>*/}
        {/*</form>*/}
      </Flex>
    </Layout>
  );
};

