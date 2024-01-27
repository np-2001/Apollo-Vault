// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ApolloVault {
    event UserRegisteredWithFacialRecognition(address indexed user, bytes32 facialRecognitionHash);

    mapping(bytes32 => address) public userHashToAddress;
    mapping(address => bool) public registeredUsers;

    function registerUser(bytes32 facialRecognitionHash) public {
        require(!registeredUsers[msg.sender], "User is already registered");
        
        // Store the user's address with the facial recognition hash
        userHashToAddress[facialRecognitionHash] = msg.sender;
        
        // Mark the user as registered
        registeredUsers[msg.sender] = true;
        
        // Emit the UserRegistered event
        emit UserRegisteredWithFacialRecognition(msg.sender, facialRecognitionHash);
    }

    function getUserAddress(bytes32 facialRecognitionHash) public view returns (address) {
        // Retrieve user's address based on facial recognition hash
        return userHashToAddress[facialRecognitionHash];
    }
}
