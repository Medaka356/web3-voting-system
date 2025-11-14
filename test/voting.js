const { expect } = require('chai');

describe('SimpleVoting', function () {
  it('Should add candidate', async function () {
    const Voting = await ethers.getContractFactory('SimpleVoting');
    const voting = await Voting.deploy();
    
    await voting.addCandidate("Alice");
    expect(await voting.getCandidateCount()).to.equal(1);
  });

  it('Should vote for candidate', async function () {
    const Voting = await ethers.getContractFactory('SimpleVoting');
    const voting = await Voting.deploy();
    
    await voting.addCandidate("Alice");
    await voting.vote(0);
    
    const candidate = await voting.getCandidate(0);
    expect(candidate.voteCount).to.equal(1);
  });

  it('Should prevent double voting', async function () {
    const Voting = await ethers.getContractFactory('SimpleVoting');
    const voting = await Voting.deploy();
    
    await voting.addCandidate("Alice");
    await voting.vote(0);
    
    await expect(voting.vote(0)).to.be.revertedWith('You have already voted!');
  });
});
