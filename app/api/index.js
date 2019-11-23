import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import DocumentStore from './orbitDB/DocumentStore'


class API {
  constructor () {
    const ipfs = new IPFS()

    ipfs.on('ready', async () => {
      const orbitdb = await OrbitDB.createInstance(ipfs)
      const id = orbitdb.identity
      // DocumentStore created with info from orbitdb
      // need identity, address and options
      const store = new DocumentStore(id, ipfs, 'mneno-db', {})
      store.events.on('write', orbitdb._onWrite.bind(orbitdb))
    })
  }

  getPosts () {

  }

  getPost (slug) {
    // get posts from orbitdb
  }

  createPost (info) {
    // upload content to orbit db
  }

  uploadPostData (data) {

  }

  uploadPost (file) {

  }
}

export default new API()
