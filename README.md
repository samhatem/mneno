# mneno
Decentralized content monetization

## App

Note: you will need to run an instance of ipfs and update app/orbit-manager accordingly to save created content to ipfs

Getting started with ipfs: https://docs.ipfs.io/introduction/usage/

```
ipfs daemon --enable-pubsub-experiment
```
--enable-pubsub-experiment option allows for local requests to ipfs during development

clone the repository

```
cd mneno/app

npm install

npm dev
```

![Mneno web app](https://github.com/samhatem/mneno/blob/master/public/Mneno-app.png)


Note: The current version of the repository is not integrated with the Mneno smart contract yet.


## Smart contracts

https://jungle.eosq.app/account/iwrtjlgcfi3d/tables?scope=iwrtjlgcfi3d&tableName=posttable
