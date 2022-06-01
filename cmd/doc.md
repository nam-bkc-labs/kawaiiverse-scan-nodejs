1.tx_eth
```
npx sequelize-cli model:generate --name tx_eth --attributes hashCosmos:string,hash:string,nonce:bigint,blockHash:string,blockNumber:bigint,transactionHash:string,transactionIndex:integer,from:string,to:string,value:string,gas:bigint,gasPrice:string,input:string,contractAddress:string,cumulativeGasUsed:bigint,gasUsed:bigint,block:bigint,from_model:string,to_model:string,status:boolean,timestamp:date,i_tx:integer
```
2.block_eth
```angular2html
npx sequelize-cli model:generate --name block_eth --attributes number:bigint,hash:string,parentHash:string,nonce:string,sha3Uncles:string,transactionsRoot:string,stateRoot:string,receiptsRoot:string,miner:string,difficulty:string,totalDifficulty:string,extraData:string,size:string,gasLimit:string,gasUsed:string,timestamp:date,uncles:string,signer:string,m2:string,status:boolean,finality:bigint,updateFinalityTime:bigint,e_tx:bigint
```
