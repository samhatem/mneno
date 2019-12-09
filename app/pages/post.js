import React from 'react'
import Layout from '../layouts/Main'
import API from '../orbit-manager'

const Wrapper = styled.div`
  padding: 3rem;
  max-width: 750px;
  margin: 0 auto;

  @media (max-width: 750px) {
    width: 100%;
    padding: 1rem;
  }

  h1 {
    color: #222;
    font-weight: bold;
    font-size: 1.75rem;
    line-height: 35px;
    font-family: "PT Sans", sans-serif;
    text-transform: capitalize;
    margin: 0;
  }

  p {
    line-height: 28px;
    color: #666;
    font-family: "PT Sans", sans-serif;
  }`

const PostPage = ({ post }) =>
  <Layout>
    <h1>
      {post.title}
    </h1>
    <p>
      {post.body}
    </p>
  </Layout>

PostPage.getInitialProps = async ({ query, api }) => {
  // const res = await api.getPost(query.slug)
  // const json = await res.json()
  return { post: {} }
}

export default PostPage
