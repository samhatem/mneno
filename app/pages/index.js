import React from 'react'
import Layout from '../layouts/Main'
import API from '../orbit-manager'
import Post from '../components/Post'

const IndexPage = ({ posts }) =>
  <Layout>
    <ul>
      {/*
        posts.map(p => <Post key={p.title} post={p} />)
      */}
    </ul>
  </Layout>

IndexPage.getInitialProps = async ({ req }) => {
  //const api = new API()
  const posts = {} //api.getPosts()
  return { posts }
}

export default IndexPage
