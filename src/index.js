import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

const ipfs = new IPFS()

ipfs.on('ready', async () => {
  const orbitdb = await OrbitDB.createInstance(ipfs)
  const db = await orbitdb.docs('mneno-db')
})
