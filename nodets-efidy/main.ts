let database = require('./bd');//automatiquement idex.js
import { Blockchain } from "./blockchain";
database.onConnect(()=>{
    let blockchain = new Blockchain();
    //on doit check la repetition des signature
    blockchain.checkSignature('Rakotoarivelo', (data:any[])=>{
        if(data)console.log('Otenative de fraude, signature facial déja enregistré');
    });
    blockchain.addNewVote('Rakoto', 'TANA', 'Rakotoarivelo');
    blockchain.addNewBlock(null);
    //maka data anaty bdd
    blockchain.getVotes((data:any[])=>{
        data.forEach(element => {
            console.log(element.votes);
        });
        
    });
    
    console.log(blockchain.chain);
    
})




