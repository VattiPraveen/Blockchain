const Web3 = require('web3')
const web3 = new Web3('wss://ropsten.infura.io/ws/v3/416385bdbde94bdca6d89e4361399791')
const Tx = require('ethereumjs-tx').Transaction

const myAddress = '0x1f42480815Ad685BEFeb8de19ACe38D22EB262bc'

const contractAddress = '0x000eb06FA8d61792108C35C87527EE65c0FCD752'
const contractABI = [{"inputs":[{"internalType":"uint256","name":"_biddingTime","type":"uint256"},{"internalType":"address payable","name":"_beneficiary","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"auctionEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"highestBidIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"returnPrevBidAmt","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"bidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawnAmount","type":"event"},{"inputs":[],"name":"auctionEnd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"auctionEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bid","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"highestBidder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"highestbid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"}]

const electionContract = new web3.eth.Contract(contractABI, contractAddress)

electionContract.getPastEvents('allEvents',{
    filter: {from: myAddress},
    fromBlock: 12685536,
    toBlock: 'latest'
}, function(err, events){console.log("All highest bid logs:\n",
events,
"\n\n####################################\n####################################\n\n")})

/*

electionContract.getPastEvents('returnPrevBidAmt',{
    filter: {from: myAddress},
    fromBlock: 12685536,
    toBlock: 'latest'
}, function(err, events){console.log("All returning bid logs:\n",
events,
"\n\n####################################\n####################################\n\n")})

electionContract.getPastEvents('auctionEnded',{
    filter: {from: myAddress},
    fromBlock: 12685536,
    toBlock: 'latest'
}, function(err, events){console.log("Alert: Auction ended\n",
    events,
    "\n\n####################################\n####################################\n\n")})

electionContract.getPastEvents('withdrawnAmount',{
    filter: {from: myAddress},
    fromBlock: 12685536,
    toBlock: 'latest'
}, function(err, events){console.log("Final withdraws\n",
events,
"\n\n####################################\n####################################\n\n")})

*/

