import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, Flex, Form, message, SelectProps, Upload} from 'antd';
import {Layout} from '../../components/layout/layout';
import {useAddPostMutation, useEditPostMutation, useGetPostQuery} from '../../api/posts';
import {CustomBreadcrumb} from '../../components/custom-breadcrumb/custom-breadcrumb';
import {CustomInput} from '../../components/custom-input/custom-input';
import {button} from '../../themes/buttons';
import {CustomTextarea} from '../../components/custom-textarea/custom-textarea';
import CustomSelect from '../../components/custom-select/custom-select';
import {DownloadOutlined} from "@ant-design/icons";
import {CustomTitle} from "../../components/custom-title/custom-title";

import {useGetAllTagsQuery} from "../../api/tags";
import {useNavigate, useParams} from "react-router-dom";
import {selectUser} from "../../features/auth/authSlice";
import {useAppSelector} from "../../hooks/hooks";

import styles from './Post-form.module.scss';

// const {Title, Text} = Typography

export const PostForm = () => {
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const {url} = useParams();
  const [imageFile, setImageFile]: any = useState('');
  const [showImage, setShowImage]: any = useState('');
  const [addPost, {isLoading: addPostLoading}] = useAddPostMutation();
  const [editPost, {isLoading: editPostLoading, isError}] = useEditPostMutation();
  const [isLoading, setIsLoading] = useState(true)
  const {data: post, isLoading: getPostLoading}: any = useGetPostQuery(url || '0');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(url ? editPostLoading : addPostLoading);
    
    if (url && (user?.role != 'ADMIN' && user?.id != post?.authorId)) {
      navigate('/')
    }
  }, []);
  
  const [content, setContent] = useState('');
  
  useEffect(() => {
    if (url && post) {
      // setTitle(post.title);
      // setDescription(post.description);
      setContent(post.content);
      // setTags(post.tags);
      
      if (post.image) {
        setImageFile(null);
      }
    }
  }, [url, post]);
  
  const onFinish = async (values: any) => {
    console.log(values)
    try {
      const postData = new FormData();
      postData.append('title', values.title);
      postData.append('description', values.description);
      postData.append('image', imageFile);
      postData.append('content', values.content);
      postData.append('tags', values.tags);
      
      if (url) {
        await editPost({url, postData}).unwrap();
        message.success('Тема успешна изменена!');
      } else {
        await addPost(postData).unwrap();
        message.success('Тема успешна добавлена!');
      }
      navigate(`/user-post`);
    } catch (error: any) {
      message.error(error.data.message);
    }
  };
  
  
  const normFile = (e: any) => {
    return e && e.fileList;
  };
  
  const handleImageClick = () => {
    // @ts-ignore
    document.getElementById("addFile").click();
  };
  
  const handleFileChange = async (file: any) => {
    try {
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setShowImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
    }
  };
  
  const {data: dataTags} = useGetAllTagsQuery();
  
  const selectOptions: SelectProps['options'] = dataTags
    ? dataTags.map((tag) => ({
      label: tag.name,
      value: tag.id,
      desc: tag.description,
    }))
    : [];
  
  return (
    <Layout>
      <Flex vertical gap={12}>
        <CustomBreadcrumb/>
        
        {/*<CustomTitle title={"Добавить пост"} level={1}/>*/}
        <CustomTitle title={url ? 'Изменить тему' : 'Добавить тему'} level={1}/>
        
        {getPostLoading ? undefined :
          <Form
            className={styles.item}
            layout="vertical"
            // initialValues={
            // {
            //   title,
            //   description,
            //   image,
            //   content,
            //   tags,
            // }
            // }
            onFinish={onFinish}
          >
            <Flex vertical gap={4}>
              <CustomInput defaultValue={post && post.title} name="title" placeholder="Заголовок"/>
              <CustomInput defaultValue={post && post.description} name="description" placeholder="Краткое описание"/>
              
              <div style={{display: "flex"}} onClick={handleImageClick}>
                {showImage || post && post.image ? (
                  <img
                    src={showImage || `${process.env.REACT_APP_URL}${post.image}`}
                    alt="Загруженное изображение"
                    className={styles.img}
                  />
                ) : (
                  <div className={styles.img}>
                    <Flex vertical gap={4} align={"center"} justify={"center"} style={{height: '100%'}}>
                      <DownloadOutlined className={styles.icon}/>
                      <span className={styles.download}>Загрузить изображение</span>
                    </Flex>
                  </div>
                )}
              </div>
              
              <Form.Item
                name="file"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                // rules={[{required: true, message: 'Обязательное поле'}]}
                style={{display: "none"}}
              >
                <Upload
                  id={"addFile"}
                  customRequest={() => {
                  }}
                  beforeUpload={handleFileChange}
                  listType="picture"
                  maxCount={1}
                  accept="image/jpeg, image/png"
                >
                  <Button>Выберите файл</Button>
                </Upload>
              </Form.Item>
              
              
              <CustomTextarea
                defaultValueTextarea={post?.content}
                name={"content"}
              />
              
              <CustomSelect
                selectedValues={post ? post.tags.map((tag: any) => tag.id) : undefined}
                selectOptions={selectOptions}
                name="tags"
                placeholder="Теги"
              />
              
              <ConfigProvider theme={button}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Опубликовать
                </Button>
              </ConfigProvider>
            </Flex>
          </Form>
        }
      
      </Flex>
    </Layout>
  );
};
