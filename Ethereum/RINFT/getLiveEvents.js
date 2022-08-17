const Web3 = require('web3')
const web3 = new Web3('wss://ropsten.infura.io/ws/v3/416385bdbde94bdca6d89e4361399791')

var highestBidIncreased = web3.utils.sha3('highestBidIncreased(address,uint256)')
var returnPrevBidAmt = web3.utils.sha3('returnPrevBidAmt(address,uint256)')
var auctionEnded = web3.utils.sha3('auctionEnded(address,uint256)')
var withdrawnAmount = web3.utils.sha3('withdrawnAmount(address,uint256)')


var options = {
    reconnect: {
            auto: true,
            delay: 5000, // ms
            maxAttempts: 5,
            onTimeout: false
    },
    address: '0x000eb06FA8d61792108C35C87527EE65c0FCD752',
    topics: [highestBidIncreased]
}

var subscription = web3.eth.subscribe('logs', options, function(error, result){
    if (!error) console.log('got result')
    else console.log(error)
}).on("data", function(log){
    console.log('got data', log);
}).on("changed", function(log){
    console.log('changed')
})