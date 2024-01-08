const SHA256 = require('crypto-js/sha256');

class Transactions{
    constructor(fromAddress, toAddress, amount, check, time )
    {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.check = check;
        this.time = time;
        
    }
}

class Block{
    constructor(timestamp, transactions, perviousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.perviousHash = perviousHash;
        this.hash = this.calculateHash();
        
    }

    calculateHash(){
        return SHA256(this.index + this.perviousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    mineBlock()
    {
        this.hash = this.calculateHash();
           
        console.log("Block mined: " + this.hash);
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block("01/01/2024", ["Shahroz Block"], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTractions(miningRewardAddress) {
        
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);

       
       
    }

    minePendingTractions(miningRewardAddress) {
        let transactions2 = null;
        let hold = Number.MAX_SAFE_INTEGER;
    
        for (let i = 0; i < this.pendingTransactions.length; i++) {
            if (!this.pendingTransactions[i].check && this.pendingTransactions[i].time < hold) {
                transactions2 = this.pendingTransactions[i];
                hold = this.pendingTransactions[i].time;
            }
        }
    
        if (transactions2) {
            transactions2.check = true;
            console.log("Time is: " + transactions2.time);
    
            let block = new Block(Date.now(), [transactions2], this.getLatestBlock().hash);
            block.mineBlock();
    
            console.log('Block successfully Mined, which has Deposit of: ' + transactions2.amount);
            this.chain.push(block);
    
            // Remove the mined transaction from the pending transactions
            this.pendingTransactions = this.pendingTransactions.filter(trans => trans !== transactions2);
        } else {
            console.log("No valid pending transactions found.");
        }
    
       
        this.pendingTransactions.push(new Transactions(null, miningRewardAddress, this.miningReward));
    }
    
    
   

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
    
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance = balance -trans.amount;
                }
    
                if (trans.toAddress === address) {
                    balance = balance + trans.amount;
                }
            }
        }
    
        
        for (const trans of this.pendingTransactions) {
            if (trans.toAddress === address) {
                balance = balance + trans.amount;
            }
            if (trans.fromAddress === address) {
                balance = balance - trans.amount;
            }
        }
    
        return balance;
    }
    

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let SavCoin = new Blockchain();

SavCoin.createTransaction(new Transactions("address1" ,"address2", 100, false,Date.now()));

SavCoin.createTransaction(new Transactions("address2" ,"address1", 50, false ,Date.now()));

SavCoin.createTransaction(new Transactions("address3" ,"address4", 20, false ,Date.now()));
SavCoin.createTransaction(new Transactions("address4" ,"address3", 30, false ,Date.now()));

console.log("Starting the Miner...");
SavCoin.minePendingTractions("shahroz-address");
SavCoin.minePendingTractions("shahroz-address");
SavCoin.minePendingTractions("zain-address");


console.log("Balance of Shahroz is: "+ SavCoin.getBalanceOfAddress("shahroz-address"));
console.log("Balance of Zain is: "+ SavCoin.getBalanceOfAddress("zain-address"));