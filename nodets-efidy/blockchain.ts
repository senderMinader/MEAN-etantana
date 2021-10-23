import { EILSEQ } from "constants";

//import { SHA256 as hash  } from "crypto-js";
let hash = require("object-hash");
let chalk = require('chalk');
let NONCE = hash(2021);

let validator = require('./validator');

let mongo = require("mongoose");

let blockChainModel = mongo.model("BlockChain")
export class Blockchain {
    votes : any[]
    chain : any [];
    hash : any;
    constructor(){
        this.chain = [];
        this.votes = [];

    }
    getLastBlock(callback:any){
        //get last block from mongodb
        return blockChainModel.findOne({}, null, { sort : {_id:-1},limit:1},(err:any, block:any)=>{
             if(err) return console.error("Cannot find last block");
             return callback(block);
        })
    }

    getVotes(callback:any){
        //get all votes from mongodb
        return blockChainModel.find({}, null,(err:any, data : any[])=>{
            if(err) return console.error("cannot reach db");
            
            return callback(data);
        })
    }
    checkSignature(signature:string, callback:any){
        //check if one signature is getting redondant
        return blockChainModel.find({signature : signature}, null,(err: any, data : any[])=>{
            if(err) return console.error("cannot reach bd");
               return callback(data);
        })
    }
    addNewBlock(previousHash: any){
        interface bloc{
            index : number,
            timestamp : number,
            votes : any[],
            prevHash : any,
            [key : string] : any
        };
        let block : bloc;
        block ={
            index : this.chain.length +1,
            timestamp : Date.now(),
            votes : this.votes,
            prevHash : previousHash
        };
        if (validator.preuve() == NONCE){
            block.hash = hash(block);
            this.getLastBlock((lastblock: any)=>{
                if(lastblock){
                    block.prevHash = lastblock.hash;
                }
                
                let newBlock = new blockChainModel(block);
                newBlock.save((err:any)=>{
                    if(err) return console.log(chalk.red('cannot save date to db', err.message))
                    console.log(chalk.green( "Block saved on db"));
                    
                })
                  //this.hash = hash(block.toString());
                //add to chain
                this.chain.push(block);
                this.votes = []; 
                return block;
            });
           
        }
      
    }

    addNewVote(elu : string, bv: string, signature : string){
        this.votes.push({ elu, bv , signature});

    }

    lastBlock(){
        return this.chain.slice(-1)[0];
    }

    isEmpty(){
        return this.chain.length == 0;
    }
}