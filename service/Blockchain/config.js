const env = {
    abi : [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_setId",
                    "type": "uint256"
                }
            ],
            "name": "getQty",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ],
    contractAddress : "0xF4bac3A3aa5Ff583a3e0D1e2e511979901C1a4A8",
    httpProviderAddress : 'https://mainnet.infura.io/4f78636b5cdc4a3b9d515687d83510ec4f78636b5cdc4a3b9d515687d83510ec/'
}

module.exports = env;
