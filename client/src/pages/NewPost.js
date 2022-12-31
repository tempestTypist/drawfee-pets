import React from 'react';
import PostForm from '../components/PostForm';

const NewPost = () => {

  return (
    <div className="flex-row justify-center">
      <div
        className="col-12 col-md-10">
        <PostForm />
      </div>
    </div>
  );
};

export default NewPost;
