pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Store {
  string[] medicalHistory;

  function set(string memory _fileHash) public {
    medicalHistory.push(_fileHash);
  }

  function get() public view returns (string[] memory) {
    return medicalHistory;
  }

  function clear() public {
    delete medicalHistory;
  }
}