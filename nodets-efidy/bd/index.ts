let mongoose = require("mongoose");

let blockChainModel = require('./model'); 
//connexion bd

mongoose.connect("mongodb://localhost:27017/efidy", (err: any)=>{
    if(err)return console.log("Cannot connect to the DB");
    console.log("Database connected Successfully"); 
    connexionCallback();
})

let connexionCallback = ()=>{}
module.exports.onConnect = (callback : any)=>{
    connexionCallback = callback;
}