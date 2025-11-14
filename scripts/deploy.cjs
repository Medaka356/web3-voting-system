const { ethers } = require('hardhat');

async function main() {
  const Voting = await ethers.getContractFactory('SimpleVoting');
  const voting = await Voting.deploy();
  
  await voting.waitForDeployment();
  const address = await voting.getAddress();
  
  console.log('?? Voting contract deployed to:', address);
  console.log('?? Initial candidate count:', await voting.getCandidateCount());
  
  // Test: Add some candidates
  await voting.addCandidate('Alice');
  await voting.addCandidate('Bob');
  console.log('? Candidates added:', await voting.getCandidateCount());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
