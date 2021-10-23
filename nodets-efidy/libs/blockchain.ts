import { Block } from "./block";
import { SHA256 as hash  } from "crypto-js";
import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Blocky{
  preced_hash : string;
  timestamp: number;
  vote: string[];
  signature : string;
  nonce : string ; 
  current_hash : string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<Blocky>({
  preced_hash: { type: String, required: true },
  timestamp: { type: Number, required: true },
  vote : { type: [] , required : true},
  signature : {type : String, required : true},
  nonce : { type : String, required : true},
  current_hash : {type : String, required:true}
});

// 3. Create a Model.
export const blockModel = model<Blocky>('Blocky', schema);

let genesis = new Block('null', ['genesis'],'nomerika.dev')

run().catch(err => console.log(err));
async function run(): Promise<void> {
  // 4. Connect to MongoDB
  await connect('mongodb://localhost:27017/test');

  let doc = new blockModel({
    preced_hash : genesis.getPrecedHash(),
    timestamp : genesis.getTimestamp(),
    vote: genesis.getVote(),
    signature: genesis.getSignature(),
    nonce : genesis.getNonce(),
    current_hash : genesis.getHashOfBlock()
  });
  await doc.save();

  //console.log(doc); 
}

blockModel.find().then((result)=>{
  console.log(result); 
}).catch()
//chaine des 'blocks' amzay

//api for getting data from db
//connecting to the bd

export class Blockchain {
    private blockchain: string[];
    private lastBlock : string;
    constructor(genesisBlock: Block){
        this.blockchain = []
        this.lastBlock = genesisBlock.getHashOfBlock();
    }

    addNewBlock():Block{ //miner un bloc
        //atao eto traitement anle maka anle signature
        //sy ilay maka anle vote
        this.lastBlock = this.getLastBlock();
        let signature : string = hash('Rakotaorivelo').toString();
        let newblock = new Block(this.lastBlock, ['Hajo', 'Epp Ambano'],signature);
        while(true){
            let nonce =(Math.floor(Math.random()*10000)).toString();
            if(hash(nonce).toString() == newblock.getNonce()){          //nonce fopla
                break;
            }else{
                console.log('still mining ....');
            }
        };
        return newblock
    }

    getLastBlock():string{
        this.lastBlock = this.blockchain.slice(-1)[0];
        return this.lastBlock;
    }
    
    //afficher la liste des chaines
    showChain():void{
      console.log(this.blockchain.toString());    
    }
}