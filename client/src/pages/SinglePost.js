import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { request } from 'graphql-request';

import { ButtonGroup, Pagination } from 'react-bootstrap'
import JankyButton from '../components/JankyButton'
import ForumPost from '../components/ForumPost'
import ReplyForm from '../components/ReplyForm'
import Loading from '../components/Loading'
import Paginate from '../components/Paginate';
import ReactPaginate from 'react-paginate';

import { QUERY_SINGLE_POST } from '../utils/queries'

const SinglePost = ({ setErrors }) => {
  const { postId } = useParams();

  //query a post with the ID
  const { loading, data, fetchMore } = useQuery(QUERY_SINGLE_POST, {
    variables: { 
      postId: postId,
      offset: 0,
      limit: 10
    },
  });

  //assign the queried data to 'post'
  const post = data?.post || {};

  //assign posts comments to 'replies' state
  const [replies, setReplies] = useState([]);
  //start on page 1
  const [currentPage, setCurrentPage] = useState(1);
  //show 3 posts per page
  const [postsPerPage] = useState(3);

  // const previousPage = () => {
  //   if (currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const nextPage = () => {
  //   if (currentPage !== Math.ceil(replies.length / postsPerPage)) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = replies.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }) => {
		setCurrentPage(selected + 1);
	};

	useEffect(() => {
    if (post) {
			setReplies([post.comments]);
    }
	}, [currentPage]);

  return (
    <>
      { loading ? (
        <Loading />
      ) : (
        <>
          <h2>{post.postTitle}</h2>

          <div className="forum-toolbar w-100 mb-3 justify-content-between">
            <div className="btn-janky-wrapper">
              <Link className="btn-janky btn btn-theme" to="">Post Reply</Link>
            </div>
            {/* <Paginate
              postsPerPage={postsPerPage}
              totalPosts={replies.length}
              paginate={paginate}
              previousPage={previousPage}
              nextPage={nextPage}
            /> */}
          </div>

          <ForumPost
            postId={post._id} 
            postTitle={post.postTitle} 
            postAuthor={post.postAuthor} 
            postTime={post.createdAt} 
            postText={post.postText} 
          />

          { replies ? (
            <div>
              {currentPosts &&
                currentPosts.map((reply) => (
                <ForumPost 
                  postId={reply._id} 
                  postTitle={"Re: " + post.postTitle} 
                  postAuthor={reply.commentAuthor} 
                  postTime={reply.createdAt} 
                  postText={reply.commentText} 
                />
              ))}
              <ReactPaginate
               onPageChange={paginate}
               pageCount={Math.ceil(replies.length / postsPerPage)}
               previousLabel={'‹'}
               nextLabel={'›'}
               containerClassName={'pagination'}
               pageLinkClassName={'page-number'}
               previousLinkClassName={'page-number'}
               nextLinkClassName={'page-number'}
               activeLinkClassName={'active'}
              />
            </div> 
          ) : (
            <Loading />
          )
        }

          <ReplyForm postId={post._id} setErrors={setErrors} />
        </>
      )}
    </>
  );
};

export default SinglePost;
