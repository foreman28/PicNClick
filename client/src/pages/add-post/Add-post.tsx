import {useEffect, useState} from 'react';
import {Button, ConfigProvider, Flex, Form, message, Modal, Space, Upload, UploadFile, UploadProps} from 'antd';
import {Layout} from '../../components/layout/layout';
import {useAddPostMutation} from '../../api/posts';

import CustomBreadcrumb from "../../components/custom-breadcrumb/custom-breadcrumb";
import {CustomInput} from "../../components/custom-input/custom-input";
import {button} from "../../themes/buttons";

import styles from './Add-post.module.scss';
import {CustomTextarea} from "../../components/custom-textarea/custom-textarea";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import CustomSelect from "../../components/custom-select/custom-select";


export const AddPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [addPost, {isLoading}] = useAddPostMutation();
  const onSubmit = async (data: any) => {
    console.log(data.file.file.uid)
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


  const [imageUrl, setImageUrl] = useState<any>();

  // const getBase64 = (img: any, callback: any) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img)
  // }
  // const handleChange = (info: UploadChangeParam) => {
  //   console.log(info.file.name)
  //   console.log(info)
  //   if (info.file.status === 'uploading') {
  //     setImageUrl({fileName: info.file.name});
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     getBase64(info.file.originFileObj, (imageUrl: any) =>
  //       setImageUrl({
  //         imageUrl: imageUrl,
  //         fileName: info.file.name
  //       }),
  //     );
  //   }
  // };
  // const bdeforeUpload = (file: any) => {
  //   console.log(file)
  //   // Ограничить типы загружаемых файлов
  //   const imgType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  //
  //   if (!imgType) {
  //     message.warning('Загружайте изображения только в формате JPG / PNG / JPEG!')
  //   }
  //   // Ограничиваем размер загружаемого файла
  //   const imgSize = file.size / 1024 / 1024 < 1;
  //   if (!imgSize) {
  //     message.warning('Загружаемые изображения должны быть меньше 1 Мбайт')
  //   }
  //   return imgType && imgSize
  // }

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
      // {
      //   uid: '-xxx',
      //   percent: 50,
      //   name: 'image.png',
      //   status: 'uploading',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
      // {
      //   uid: '-5',
      //   name: 'image.png',
      //   status: 'error',
      // },
    ]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as RcFile);
      }

      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
      setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) =>
      setFileList(newFileList);

    const uploadButton = (
      <div>
        <div style={{marginTop: 8}}>Upload</div>
      </div>
    );


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

              <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Form.Item
                  name={'file'}
                  rules={[{required: true, message: 'Обязательное поле'}]}
                  shouldUpdate={true}
                >
              <Upload
                name="img"
                listType="picture"
                // className="avatar-uploader"
                // showUploadList={false}
                // onChange={handleChange}
                // beforeUpload={bdeforeUpload}
                // fileList={fileList}
                // onPreview={handlePreview}
                // onChange={handleChange}
                maxCount={1}

              >
                <Button>Upload (Max: 1)</Button>
              </Upload>
                </Form.Item>
              </Space>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
              {/*<CustomInput name={"content"} placeholder={"Содержание"}/>*/}

              <CustomTextarea name={"content"}/>

              <CustomSelect name={"tags"} placeholder={"Теги"}/>

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

