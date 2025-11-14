// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SimpleVoting {
    struct Candidate {
        string name;
        uint voteCount;
    }
    
    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;
    
    event CandidateAdded(uint candidateId, string name);
    event Voted(address voter, uint candidateId);
    
    function addCandidate(string memory _name) public {
        candidates.push(Candidate(_name, 0));
        emit CandidateAdded(candidates.length - 1, _name);
    }
    
    function vote(uint _candidateIndex) public {
        require(!hasVoted[msg.sender], 'You have already voted!');
        require(_candidateIndex < candidates.length, 'Invalid candidate!');
        
        candidates[_candidateIndex].voteCount++;
        hasVoted[msg.sender] = true;
        
        emit Voted(msg.sender, _candidateIndex);
    }
    
    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }
    
    function getCandidate(uint _index) public view returns (string memory name, uint voteCount) {
        require(_index < candidates.length, 'Invalid candidate index!');
        Candidate memory candidate = candidates[_index];
        return (candidate.name, candidate.voteCount);
    }
}
