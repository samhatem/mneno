import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import DocumentStore from './orbitDB/DocumentStore'

const ipfs = new IPFS()

ipfs.on('ready', async () => {
  const orbitdb = await OrbitDB.createInstance(ipfs)
  const id = orbitdb.identity
  // DocumentStore created with info from orbitdb
  // need identity, address and options
  const store = new DocumentStore(id, ipfs, 'mneno-db', {})
  store.events.on('write', orbitdb._onWrite.bind(orbitdb))
})

export function getPosts () {
  // get posts from orbitdb
  // change to posts
}

export function getPost (slug) {
  // get posts from orbitdb
}

export function createPost (info) {
  // upload content to orbit db
}

function uploadPostData (data) {

}

function uploadPost (file) {

}
