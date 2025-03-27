const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VotingSystem", function () {
  let votingSystem;
  let owner;
  let addr1;
  let addr2;
  let candidateNames;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    candidateNames = ["Candidate 1", "Candidate 2", "Candidate 3"];
    const VotingSystem = await ethers.getContractFactory("VotingSystem");
    votingSystem = await VotingSystem.deploy(candidateNames);
    await votingSystem.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      expect(await votingSystem.admin()).to.equal(owner.address);
    });

    it("Should initialize candidates correctly", async function () {
      for (let i = 0; i < candidateNames.length; i++) {
        const candidate = await votingSystem.candidates(i);
        expect(candidate.name).to.equal(candidateNames[i]);
        expect(candidate.voteCount).to.equal(0);
      }
    });
  });

  describe("Voting", function () {
    it("Should allow a voter to cast a vote", async function () {
      await votingSystem.connect(addr1).vote(0);
      const candidate = await votingSystem.candidates(0);
      expect(candidate.voteCount).to.equal(1);
      expect(await votingSystem.hasVoted(addr1.address)).to.equal(true);
    });

    it("Should not allow a voter to vote twice", async function () {
      await votingSystem.connect(addr1).vote(0);
      await expect(votingSystem.connect(addr1).vote(1))
        .to.be.revertedWith("You have already voted");
    });

    it("Should emit VoteCasted event when vote is cast", async function () {
      await expect(votingSystem.connect(addr1).vote(0))
        .to.emit(votingSystem, "VoteCasted")
        .withArgs(addr1.address, candidateNames[0]);
    });
  });

  describe("Winner", function () {
    it("Should return the candidate with most votes", async function () {
      await votingSystem.connect(addr1).vote(0);
      await votingSystem.connect(addr2).vote(0);
      await votingSystem.connect(owner).vote(1);

      const winner = await votingSystem.getWinner();
      expect(winner).to.equal(candidateNames[0]);
    });
  });
}); 