import OrbitDB from 'orbit-db'
import DocumentStore from './orbitDB/DocumentStore'
import IpfsClient from 'ipfs-http-client'

/**
  post = {
    fileHash: ...,
    meta: ...,
    title: ...,
    body: ....,
    author: ....,
  }

*/

export default class API {
  constructor () {
    this.ipfs = new IpfsClient('http://localhost', '5001')

    this.setOrbitDb()
  }

  async setOrbitDb () {
    this.orbitdb = await OrbitDB.createInstance(this.ipfs)
    const id = this.orbitdb.identity

    this.store = new DocumentStore(id, this.ipfs, 'mneno-db', {})
    this.store.events.on('write', this.orbitdb._onWrite.bind(this.orbitdb))

    this.store.put({ _id: 'hello world', slug: 'dfaslkjfdlakjf', posttitle: 'title title title', body: 'body body body' })
      .then(() => this.store.put({ _id: 'sup world', slug: 'dfaslkjfdlakjf', posttitle: 'title title title', body: 'body body body' }))
      .then(() => this.store.put({ _id: 'hello world2', slug: 'dfaslkjfdlakjf', posttitle: 'title title title', body: 'body body body' }))
      .then(() => this.store.put({ _id: 'hello world3', slug: 'dfaslkjfdlakjf', posttitle: 'title title title', body: 'body body body' }))

    const result = this.store.iterator({ limit: -1 }).collect()
    console.log(JSON.stringify(result, null, 2))
  }

  getPosts () {
    return this.store.query((doc) => doc)
  }

  getPost (slug) {
    return this.store.get(slug)
  }

  createPost (data) {
    // upload the post data to ipfs
    this.uploadPostData(data)

    // upload the hash of the post to orbitdb
    this.uploadPost(data)
  }

  uploadPostData (data) {
    this.store.put(data)
  }

  uploadPost (file) {
    this.store.put(file)
  }
}
