// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract Quiz {
    struct Question {
        string questionText;
        string[] options;
        uint correctOption;
    } 

   Question[] public questions;
    mapping(address => uint) public scores;
    address public owner;
    IERC20 public rewardToken;

    event QuestionAdded(uint questionIndex, string questionText);
    event AnswerSubmitted(address participant, uint questionIndex, uint selectedOption, bool isCorrect);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
