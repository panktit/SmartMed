pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Store {
  struct Record{
    string fileName;
    string date;
    string fileHash;
    string by;
  }
  mapping(string => Record[]) medicalHistory;
  mapping(string => string) secretKey;

  function setKey(string memory _id, string memory _encryptedKey) public {
    secretKey[_id] = _encryptedKey;
  }

  function getKey(string memory _id) public view returns (string memory) {
    return secretKey[_id];
  }

  function set(string memory _id, string memory _fileName, string memory _date, string memory _fileHash, string memory _by) public {
    medicalHistory[_id].push(Record(_fileName,_date,_fileHash,_by));
  }

  function get(string memory _id) public view returns (Record[] memory) {
    return medicalHistory[_id];
  }

  function getCount(string memory _id) public view  returns (uint) {
    return medicalHistory[_id].length;
  }
}