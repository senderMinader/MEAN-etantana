let mongo = require("mongoose");
let Schema = mongo.Schema;

//crrer le schema
let BlockchainSchema = new Schema({
     index : {
         require:true,
         type: Schema.Types.Number

     },
     timestamp: {
        required : true, 
        type : Schema.Types.Date,
        default: Date.now()
     },
      votes : {
          required : true, 
          type : Schema.Types.Array
      },
      prevHash : {
          required : false,
           type : Schema.Types.String
      }, 
      hash : {
          require : true, 
          type: Schema.Types.String
      }
});

module.exports = mongo.model('BlockChain', BlockchainSchema);
