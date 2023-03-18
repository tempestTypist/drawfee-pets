import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card, ButtonGroup, Table, Pagination } from 'react-bootstrap';
import JankyButton from '../../components/JankyButton';
import mug from '../../assets/images/drawfee-logos/drawfee-logo-red.jpg'

const PostList = ({
  posts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!posts.length) {
    return ( <Link className="btn" to="/new-post">New Topic</Link> )
  }

  return (
    <>
      {showTitle && <h2>{title}</h2>}

        <Card className="janky-card-wrapper">

          <div className="forum-toolbar w-100 mb-3 justify-content-between">
            {/* <Link className="btn" to="/new-post">New Topic</Link> */}
            <JankyButton variant="theme" href="/new-post" label="New Topic" />
            <div>
              {/* <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination> */}

              <Pagination aria-label="Pagination" className="m-0">
                  <ButtonGroup className="me-2">
                    <JankyButton label="«" />
                    <JankyButton label="‹" />
                    <JankyButton label="1" />
                    <JankyButton label="2" />
                    <JankyButton label="3" />
                    <JankyButton label="4" />
                    <JankyButton label="5" />
                    <JankyButton label="6" />
                    <JankyButton label="7" />
                    <JankyButton label="8" />
                    <JankyButton label="›" />
                    <JankyButton label="»" />
                  </ButtonGroup>
              </Pagination>
            </div>
          </div>


          <table className="table table-hover table-users table-responsive text-nowrap mb-4" cellSpacing="0">
            <thead>
              <tr>
                <th></th>
                <th><h2>Topic</h2></th>
                <th>Made By</th>
                <th>Replies</th>
                <th>Last Post</th>
              </tr>
            </thead>

            <tbody>
              {posts &&
                posts.map((post) => (
                <tr>
                  <td>
                    <img src={mug} alt="Drawfee Mug Logo" />
                  </td>
                  <td className="post-title w-100">
                    <Link to={`/posts/${post._id}`}>{post.postTitle}</Link>
                  </td>
                  <td>
                    <Link
                      className=""
                      to={`/profile/${post.postAuthor}`}
                      >
                      {post.postAuthor}
                    </Link>
                  </td>
                  <td className="text-center">{post.comments.length}</td>
                  <td>
                    {post.comments.length > 0 ? (
                      <>{post.comments[0].createdAt}<br/>by {post.comments[0].commentAuthor}</>
                    ) : (
                      <>{post.createdAt}<br/>by {post.postAuthor}</>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </Card>


        


      {/* {posts &&
        posts.map((post) => (
          <Card key={post._id} className="janky-card-wrapper mb-3">
            <Card.Header className="janky-card-header text-light p-2 m-0">
              {showUsername ? (
                <>
                  <Link
                    className=""
                    to={`/profile/${post.postAuthor}`}
                  >
                    {post.postAuthor}
                  </Link>
                  <span style={{ fontSize: '1rem' }}>
                    made this post on {post.createdAt}
                  </span>
                </>
              ) : (
                <span style={{ fontSize: '1rem' }}>
                  You made this post on {post.createdAt}
                </span>
              )}
            </Card.Header>
            <div className="janky-card-body-wrapper">
              <Card.Body className="janky-card-body">
                <div className="janky-card-inner-body">
                  <p>{post.postText}</p>
                  <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/posts/${post._id}`}
                  >
                    Join the discussion on this post.
                  </Link>
                </div>
              </Card.Body>
            </div>
          </Card>
        ))} */}
    </>
  );
};

export default PostList;
