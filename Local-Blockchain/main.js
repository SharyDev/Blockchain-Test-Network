const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, perviousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.perviousHash = perviousHash;
        this.hash = '';
    }

    calculateHash(){
        return SHA256(this.index + this.perviousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock];
    }
    
    createGenesisBlock() {
        return new Block(0, "01/01/2024", "Shahroz Block", "0");
    }

    getLatestBlock (){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock)
    {
        newBlock.perviousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }

    isChainValid()
    {
        for(let i=0;i<this.chain.length;i++)
        {
            const currentBlock = this.chain[i];
            const perviousHash = this.chain[i-1];
            if(currentBlock.hash != currentBlock.calculateHash())
            {
                return false;
            }
            if(currentBlock.perviousHash != perviousHash.hash)
            {
                return false;
            }
        }

       
        return true;
    }

}

let SavCoin = new Blockchain();
SavCoin.addBlock(new Block(1,"1,1,2024",{amount: 6}));
SavCoin.addBlock(new Block(1,"2,1,2024",{amount: 3}));

console.log(JSON.stringify(SavCoin,null,4));

console.log("Is Blockchain Valid: " + SavCoin.isChainValid);
