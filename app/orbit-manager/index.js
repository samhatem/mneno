import OrbitDB from 'orbit-db'
import IpfsClient from 'ipfs-http-client'
// import ScatterJS from '@scatterjs/core'
// import ScatterEOS from '@scatterjs/eosjs'
// import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'
// import { Api, JsonRpc } from 'eosjs'

// ScatterJS.plugins(new ScatterEOS())

// EOS6quun7cECbHHVZBrxraNXAaqsVGmnxk5gtvNf2hhrk3LJTw8tY
// const privateKey = '6quun7cECbHHVZBrxraNXAaqsVGmnxk5gtvNf2hhrk3LJTw8tY'
// const chainId = 'eos:chain:e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'

// const signatureProvider = new JsSignatureProvider([privateKey])
// const rpc = new JsonRpc('https://api.jungle.alohaeos.com')
// const api = new Api({ rpc, signatureProvider, chainId })

class API {
  constructor () {
    this.ipfs = new IpfsClient('http://localhost:5001')

    this.setOrbitDb()
  }

  async setOrbitDb () {
    this.orbitdb = await OrbitDB.createInstance(this.ipfs)
    this.store = await this.orbitdb.docstore('mneno-db')

    this.store.put({ _id: 'hello world', slug: 'dfaslkjfdlakjf', posttitle: 'title title title', body: 'body body body' })
      .then(() => this.store.put({ _id: 'sup world', slug: 'dfaslkjfdlakjf', posttitle: 'title title title', body: 'body body body' }))
      .then(() => this.store.put({ _id: 'hello world2', slug: 'dfaslkjfdlakjf', posttitle: 'title title title', body: 'body body body' }))
      .then(() => this.store.put({ _id: 'hello world3', slug: 'dfaslkjfdlakjf', posttitle: 'title title title', body: 'body body body' }))
  }

  getPosts () {
    return this.store.query((doc) => doc)
  }

  getPost (slug) {
    return this.store.get(slug)
  }

  async createPost (content, meta) {
    const cid = await this.uploadPost(content)

    // NEED TO CALL SC TO GET POSTID IN SC

    // NEED TO GET A TIME STAMP

    console.log(await this.uploadPostData({
      _id: meta.title + meta.author,
      cid,
      ...meta
    }))

    // NEXT NEED TO CALL SC WITH POST INFORMATION
  }

  async uploadPostData (data) {
    const put = await this.store.put(data)
    return put
  }

  async uploadPost (article) {
    const cid = await this.ipfs.add(article)
    return cid
  }
}

export default new API()
