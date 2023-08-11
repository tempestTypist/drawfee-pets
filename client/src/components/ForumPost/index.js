import React from 'react';
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'

const ForumPost = ({ postId, postTitle, postAuthor, postTime, postText }) => {

  return (
      <div key={postId} className="forum-post flex-row my-4">
        <div className="forum-post-user">
          <Image className="forum-post-pfp mb-2" thumbnail />
          <ul className="forum-post-user-info">
            <li>{postAuthor}</li>
            <li>0 posts</li>
            <li>Send Message</li>
          </ul>
        </div>
        <div className="forum-post-body">
          <div className="forum-post-header">
            <div className="forum-post-subject">{postTitle}</div>
            <p className="forum-post-info">
              by{' '}
              <Link to={`/profile/${postAuthor}`}>{postAuthor},{' '}</Link>
              {postTime}
            </p>

          </div>
          <div className="forum-post-text">
            {postText}
          </div>
        </div>
      </div>
  );
};

export default ForumPost;
