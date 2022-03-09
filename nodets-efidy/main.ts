import { Block } from "./libs/block";
import { Blockchain } from "./libs/blockchain";

let genesis = new Block('null', ['genesis'],'nomerika.dev')
let maBlockchain = new Blockchain (genesis);

maBlockchain.showChain();

console.log('   ');

maBlockchain.addNewBlock();
maBlockchain.showChain();

console.log('   ');

maBlockchain.addNewBlock();
maBlockchain.showChain();

console.log('   ');

maBlockchain.addNewBlock();
maBlockchain.showChain();

//ry tanindrazanay malala oh ry madagasikara soa 
console.log('tapitra');

//ry madagasikara soa
// lorem lava beflksdhfisuhydfvusdhofusoef
console.log("fanidroany");