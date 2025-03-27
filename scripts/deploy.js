const hre = require("hardhat");

async function main() {
  const candidateNames = ["Candidate 1", "Candidate 2", "Candidate 3"];
  console.log("Deploying VotingSystem contract...");
  
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.deploy(candidateNames);
  await votingSystem.waitForDeployment();
  
  console.log("VotingSystem deployed to:", await votingSystem.getAddress());
  console.log("Admin address:", await votingSystem.admin());
  console.log("Initial candidates:");
  
  for (let i = 0; i < candidateNames.length; i++) {
    const candidate = await votingSystem.candidates(i);
    console.log(`${i + 1}. ${candidate.name} (Votes: ${candidate.voteCount})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 