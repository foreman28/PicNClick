import React from 'react';
import { useForm } from 'react-hook-form';
import {useAddPostMutation} from "../../api/posts";

const AddPostForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [addPost, { isLoading }] = useAddPostMutation();

  const onSubmit = async (data) => {
    try {
      await addPost(data);
      // Обработка успешного добавления поста, например, перенаправление на страницу с постами
    } catch (error) {
      console.error(error);
      // Обработка ошибки добавления поста
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Заголовок:</label>
      <input
        type="text"
        name="title"
        id="title"
        {...register('title', { required: 'Это поле обязательное' })}
      />
      {errors.title && <p>{errors.title.message}</p>}

      <label htmlFor="content">Содержание:</label>
      <textarea
        name="content"
        id="content"
        {...register('content', { required: 'Это поле обязательное' })}
      />
      {errors.content && <p>{errors.content.message}</p>}

      <label htmlFor="tags">Теги:</label>
      <input
        type="text"
        name="tags"
        id="tags"
        {...register('tags', { required: 'Это поле обязательное' })}
      />
      {errors.tags && <p>{errors.tags.message}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Добавление...' : 'Добавить пост'}
      </button>
    </form>
  );
};

export default AddPostForm;
