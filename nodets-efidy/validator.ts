let hash = require("object-hash");
let NONCE = hash(2021);

module.exports.validProof = (porofo : any)=>{
    porofo = hash(porofo);
   console.log("Hashing : ", porofo);
   return porofo == NONCE; 
    
}

module.exports.preuve=()=>{
    let proof : number = 0;
    //let validProof = require('validProof');
    while (true) {
        if(!(module.exports.validProof(proof))){
            proof= proof + 1;
            console.log(proof);  
        }else{
            break;
        }
    }
    return hash(proof);
}