const Web3 = require('web3')
const env = require('./config.js')

var contract = function () {};

contract.prototype.initWeb3 = function () {
    let web3 = new Web3(new Web3.providers.HttpProvider(env.httpProviderAddress));
    let contract = web3.eth.contract(env.abi);
    let ins = contract.at(env.contractAddress);
    
    return ins;
}

contract.prototype.showContractIns = function(){
    let ins_contract = this.initWeb3();
    return ins_contract;
}

contract.prototype.getQuantityOfItem = function(type, callback) {
    let ins_contract = this.initWeb3();
    
    try {
        var res = ins_contract.getQty(type)
    } catch (error) {
        console.log(error)
    }
    
    if (res) {
        if(callback){
            callback(res.toString())
        }
    }
}

module.exports = contract;





