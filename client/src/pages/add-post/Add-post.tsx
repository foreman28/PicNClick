import {useEffect, useState} from 'react';
import {Button, ConfigProvider, Flex, Form, Upload} from 'antd';
import {Layout} from '../../components/layout/layout';
import {useAddPostMutation} from '../../api/posts';

import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import {CustomInput} from "../../components/custom-input/custom-input";
import {button} from "../../themes/buttons";

import styles from './Add-post.module.scss';
import {CustomTextarea} from "../../components/custom-textarea/custom-textarea";
import {UploadChangeParam} from "antd/es/upload";
import CustomSelect from "../../components/custom-select/custom-select";


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


  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange = (info: UploadChangeParam) => {
    console.log(info.file.url);
    if (info.file.status === 'uploading') {
      setImageUrl(info.file.url);
      return;
    }
    if (info.file.status === 'done') {
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

            <Upload
              name="img"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              onChange={handleChange}

            >
              {imageUrl ?
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                :
                <div style={{ marginTop: 8 }}>Upload</div>
              }
            </Upload>

            {/*<CustomInput name={"content"} placeholder={"Содержание"}/>*/}

            <CustomTextarea name={"content"} />

            <CustomSelect name={"tags"} placeholder={"Теги"} />

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

