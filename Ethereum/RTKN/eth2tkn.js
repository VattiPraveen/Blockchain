const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/416385bdbde94bdca6d89e4361399791')
var Tx = require('ethereumjs-tx').Transaction
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const myAddress = '0x1f42480815Ad685BEFeb8de19ACe38D22EB262bc'
const private_1 = Buffer.from(process.env.MY_PRIVATE_KEY_1, 'hex')


const contractAddress = '0x75c7Cd72D5f2254C793803d183C2b3251935bcd9'
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_candidateId","type":"uint256"}],"name":"votedEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"candidatesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_candidateId","type":"uint256"}],"name":"vote","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]

const electionContract = new web3.eth.Contract(contractABI, contractAddress)

electionContract.methods.candidatesCount().call({from : myAddress}).then(function(result){ 
    console.log('No of candidates: ', result)
    readline.question('Choose a number to vote: ', value => {
        const data = electionContract.methods.vote(value).encodeABI()

        web3.eth.getTransactionCount(myAddress, (err, txCount) => {
    
            //create transaction
            const txObject = {
                nonce: web3.utils.toHex(txCount),
                gasLimit: web3.utils.toHex(3000000),
                gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
                to: contractAddress,
                data: data,
                value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
            }

            //sign transaction
            const tx = new Tx(txObject, { chain: 'ropsten' })
            tx.sign(private_1)

            const serializedTx = tx.serialize()
            const raw = '0x' + serializedTx.toString('hex')


            //broadcast transaction
            web3.eth.sendSignedTransaction(raw,(err, txHash) => {
                console.log('err:', err, 'txHash:', txHash )
            }) 
        })
    });

})


