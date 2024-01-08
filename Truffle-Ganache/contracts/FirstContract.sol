pragma solidity >=0.4.22 <0.9.0;

// Shahroz

contract FirstContract {
    uint256 public a = 10;

    function setter(uint256 _a) public {
        a = _a;
    }

    function getter() public view returns (uint256) {
        return a;
    }
}
