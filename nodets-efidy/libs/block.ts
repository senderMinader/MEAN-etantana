import {SHA256 as hash} from 'crypto-js';
//en tete du bloc :
    //version du block (raha miova ny version du blockchain bitcoin)
    //hash du precedent block
    //hash du merkel root (tsy asiana satri mi compte othatran'ny transaction iray ihany vote iray)
    //timestamp (heure d'enregistrement)
    //bits (difficulté tsy hapetaka)
    //nonce (atao statique satria on n'essaye pas de chercher une preuve de travail)

//+liste des transactions, dans notre cas, les données du vote
export class Block {
    private preced_hash : string;
    private timestamp : number;
    private vote : string[];
    private signature : string; //alternative de la preuve de travail
    private nonce :  string; //ho atao chiffre aleatoire mba hapa ela calcul fotsiny

    constructor(precedent: string, vote : string[], signature : string){
        this.preced_hash = precedent;
        this.timestamp = Date.now();
        this.vote = vote;
        this.signature = hash(signature).toString();
        this.nonce = hash('2021').toString();
    }

    getHashOfBlock():string{
        return hash(hash(this.preced_hash + this.timestamp + this.vote.toString() + this.signature)).toString();
    }
    getNonce():string{
        return this.nonce;
    }
    getPrecedHash():string{
        return this.preced_hash;
    }
    getTimestamp():number{
        return this.timestamp;
    }
    getVote():string[]{
        return this.vote;
    }
    getSignature():string{
        return this.signature;
    }
}

