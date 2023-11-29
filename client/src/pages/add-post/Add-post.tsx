import { useEffect, useState } from 'react';
import {Button, ConfigProvider, Flex, Form, message, Upload} from 'antd';
import { Layout } from '../../components/layout/layout';
import { useAddPostMutation } from '../../api/posts';
import CustomBreadcrumb from '../../components/custom-breadcrumb/custom-breadcrumb';
import { CustomInput } from '../../components/custom-input/custom-input';
import { button } from '../../themes/buttons';
import styles from './Add-post.module.scss';
import { CustomTextarea } from '../../components/custom-textarea/custom-textarea';
import CustomSelect from '../../components/custom-select/custom-select';
import {DownloadOutlined} from "@ant-design/icons";

export const AddPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [addPost, { isLoading }]:any = useAddPostMutation();
  const [imageBase64, setImageBase64] = useState(null);
  useEffect(() => {
    // addPost({"title":"asd","description":"asd","content":"<p>asd</p>"})
  }, []);
  const normFile = (e:any) => {
    if (Array.isArray(e)) {
      return e;
    }
    const fileList = e && e.fileList;
    if (fileList && fileList.length > 0) {
      getBase64(fileList[0].originFileObj, (base64:any) => {
        setImageBase64(base64);
      });
    }
    return fileList;
  };
  
  const getBase64 = (file:any, callback:any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };
  
  const onFinish = async (values:any) => {
    try {
      const postData:any = {
        title: values.title,
        description: values.description,
        content: values.content,
        // image64: imageBase64, // изменить на сторонний сервис
        // tags: values.tags,
      };
      // console.log(postData)
      await addPost({postData});
      // message.success('Пост успешно добавлен!');
    } catch (error) {
      console.error(error);
      // message.error('Произошла ошибка при добавлении поста.');
    }
  };
  
  const handleImageClick = () => {
    // @ts-ignore
    document.getElementById("file").click();
  };
  
  return (
    <Layout>
      <Flex vertical gap={12}>
        <CustomBreadcrumb />
        <Form className={styles.item} layout="vertical" onFinish={onFinish}>
          <Flex vertical gap={4}>
          <CustomInput name="title" placeholder="Заголовок" />
          <CustomInput name="description" placeholder="Краткое описание" />

          <div style={{display: "flex"}} onClick={handleImageClick}>
            {imageBase64 ? (
              <img
                src={imageBase64}
                alt="Загруженное изображение"
                className={styles.img}
              />
            ) : (
              <div className={styles.img}>
                <Flex vertical gap={4} align={"center"} justify={"center"} style={{ height: '100%' }}>
                  <DownloadOutlined className={styles.icon} />
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
            style={{ display: 'none' }}
          >
            <Upload
              name="img"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} // Prevent default upload behavior
              showUploadList={false} // Hide the file list
            >
              <input type="file" id="fileInput" />
            </Upload>
          </Form.Item>
          
          <CustomTextarea name="content" />
          
          {/*<CustomSelect name="tags" placeholder="Теги" />*/}
          
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
