import React, {useEffect, useState} from 'react';
import {Button, ConfigProvider, Flex, Form, message, Upload} from 'antd';
import {Layout} from '../../components/layout/layout';
import {useAddPostMutation} from '../../api/posts';
import CustomBreadcrumb from '../../components/custom-breadcrumb/custom-breadcrumb';
import {CustomInput} from '../../components/custom-input/custom-input';
import {button} from '../../themes/buttons';
import styles from './Add-post.module.scss';
import {CustomTextarea} from '../../components/custom-textarea/custom-textarea';
import CustomSelect from '../../components/custom-select/custom-select';
import {DownloadOutlined} from "@ant-design/icons";
import {useGetAllTagsQuery} from "../../api/tags";

export const AddPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [imageFile, setImageFile]: any = useState('');
  const [showImage, setShowImage]: any = useState('');
  
  const [addPost, {isLoading}]: any = useAddPostMutation();
  
  const onFinish = async (values: any) => {
    try {
      
      console.log(values.tags)
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('image', imageFile);
      formData.append('content', values.content);
      formData.append('tags', values.tags);
      
      await addPost(formData);
      message.success('Пост успешно добавлен!');
    } catch (error) {
      console.error(error);
      message.error('Произошла ошибка при добавлении поста.');
    }
  };
  
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
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
      console.error('Error reading file:', error);
    }
  };

  return (
    <Layout>
      <Flex vertical gap={12}>
        <CustomBreadcrumb/>
        <Form className={styles.item} layout="vertical" onFinish={onFinish}>
          <Flex vertical gap={4}>
            <CustomInput name="title" placeholder="Заголовок"/>
            <CustomInput name="description" placeholder="Краткое описание"/>
            
            <div style={{display: "flex"}} onClick={handleImageClick}>
              {showImage ? (
                <img
                  src={showImage}
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
              rules={[{ required: true, message: 'Обязательное поле' }]}
              style={{display: "none"}}
            >
              <Upload
                id={"addFile"}
                customRequest={() => {}}
                beforeUpload={handleFileChange}
                listType="picture"
                maxCount={1}
                accept="image/*"
              >
                <Button>Выберите файл</Button>
              </Upload>
            </Form.Item>
            
            <CustomTextarea name="content"/>
            
            <CustomSelect name="tags" placeholder="Теги" />
            
            <ConfigProvider theme={button}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Добавить пост
              </Button>
            </ConfigProvider>
          </Flex>
        </Form>
      </Flex>
    </Layout>
  );
};
