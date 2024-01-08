const FirstContract = artifacts.require("FirstContract");
// Sharhoz
module.exports = function(deployer) {
    
  deployer.deploy(FirstContract);
};
