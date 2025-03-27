# Voting System Smart Contract

This project implements a basic voting system on the Ethereum blockchain using Hardhat. The contract allows an admin to initialize a list of candidates and enables any Ethereum address to cast a vote for one of the candidates.

## Features

- Initialize candidates during contract deployment
- Cast votes for candidates
- Prevent double voting
- Track voting status
- Determine the winning candidate
- Event emission for vote casting

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd voting-system
```

2. Install dependencies:
```bash
npm install
```

## Testing

Run the test suite:
```bash
npx hardhat test
```

## Deployment

1. Start a local Hardhat network:
```bash
npx hardhat node
```

2. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

## Contract Functions

- `constructor(string[] memory _candidateNames)`: Initializes the contract with a list of candidates
- `vote(uint256 _candidateIndex)`: Allows a voter to cast a vote for a candidate
- `getWinner()`: Returns the name of the candidate with the most votes

## Events

- `VoteCasted(address voter, string candidate)`: Emitted when a vote is cast

## License

MIT
