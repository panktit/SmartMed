pragma solidity ^0.5.0;

contract Policy{
    struct AccessRights{
        string docname;
        string doc;
        string rights;
    }
    mapping(string => uint) UserPolicyCountMap;
    mapping(string => AccessRights[]) policy;
    function AddPolicy( string memory username, string memory doc, string memory docname,string memory rights) public {
        policy[username].push(AccessRights(doc,docname,rights));
        UserPolicyCountMap[username] = UserPolicyCountMap[username]+1;
        UserPolicyCountMap[username] = UserPolicyCountMap[username];
    }

    function getUserPolicyCount(string memory username) public view  returns(uint){
        return UserPolicyCountMap[username];
    }
}