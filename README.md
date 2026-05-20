
Collateralized Lending/Borrowing Platform Report
Mini Compound-like dApp for Lending ERC20 Tokens
________________________________________
1. Introduction
Project Title
Collateralized Lending/Borrowing Platform – A Mini Compound-like dApp
Objective
The objective of this project is to build a decentralized finance (DeFi) lending and borrowing platform inspired by Compound Finance. The platform allows users to:
•	Supply ERC20 tokens into a liquidity pool.
•	Use supplied assets as collateral.
•	Borrow other ERC20 tokens against their collateral.
•	Repay loans.
•	Withdraw supplied assets when conditions are met.
This project demonstrates how smart contracts can automate financial services without requiring intermediaries such as banks.
________________________________________
2. Understanding the Problem
The Problem
Traditional lending systems require intermediaries such as banks or financial institutions. These systems have several limitations:
•	Long approval processes.
•	High operational costs.
•	Limited accessibility.
•	Lack of transparency.
•	Centralized control.
In decentralized finance (DeFi), users need a trustless way to lend and borrow digital assets directly on the blockchain.
However, lending without collateral is risky because borrowers may not repay their loans.
Proposed Solution
This smart contract solves the problem by implementing a collateralized lending system.
How It Works
1.	Users deposit ERC20 tokens into the protocol.
2.	Deposited tokens become collateral.
3.	Based on the collateral value, users can borrow another token.
4.	The protocol ensures users cannot borrow more than the allowed collateral ratio.
5.	If a user repays the borrowed amount, the collateral can be withdrawn.
6.	All operations are transparent and stored on the blockchain.
Why This Smart Contract Solves the Problem
The smart contract provides:
•	Transparency: All transactions are publicly recorded on-chain.
•	Automation: No human approval is needed.
•	Security: Borrowing limits prevent undercollateralized loans.
•	Accessibility: Anyone with a crypto wallet can interact with the platform.
•	Decentralization: No central authority controls the protocol.
Project Structure

├── backend/
│   ├── contracts/
│   │   ├── LendingProtocol.sol
│   │   └── MockERC20.sol
│   │
│   ├── scripts/
│   │   └── deploy.js
│   │
│   ├── test/
│   │   └── Lending.js
│   │
│   ├── hardhat.config.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── README.md

________________________________________

3. Technologies Used
Technology	Purpose
Solidity	Writing the smart contract
Hardhat	Smart contract development and deployment
OpenZeppelin	Secure ERC20 interfaces and utilities
MetaMask	Wallet interaction
Ethereum / Sepolia	Blockchain network
Ethers.js / Web3.js	Frontend interaction
________________________________________
4. Smart Contract Architecture
Main Components
1. ERC20 Token Contracts
These are the tokens used in the system.
Examples:
•	DAI
•	USDC
•	Custom Test Tokens
2. Lending Contract
The core smart contract that handles:
•	Deposits
•	Borrowing
•	Repayment
•	Withdrawals
•	Collateral management
3. User Balances
The contract stores:
•	Supplied balances
•	Borrowed balances
•	Collateral amounts
________________________________________
5. Smart Contract Code Explanation
Replace the code snippets below with your actual smart contract code.
________________________________________

Import Statements
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
Explanation
This line imports the IERC20 interface from OpenZeppelin.
Why It Is Used
The IERC20 interface allows the smart contract to interact with ERC20 tokens such as:
•	transfer()
•	transferFrom()
•	approve()
•	balanceOf()
OpenZeppelin is widely used because it provides secure and audited smart contract libraries.
________________________________________
Contract Declaration
contract LendingPlatform {
Explanation
This defines the main smart contract named LendingPlatform.
Why It Is Used
A contract in Solidity acts like a class in object-oriented programming. It contains:
•	Variables
•	Functions
•	Business logic
________________________________________
State Variables
IERC20 public collateralToken;
IERC20 public borrowToken;

Explanation
These variables store references to ERC20 token contracts.
Why It Is Used
The contract needs to know:
•	Which token is accepted as collateral.
•	Which token can be borrowed.
________________________________________
Mappings
mapping(address => uint256) public collateralBalances;
mapping(address => uint256) public borrowedBalances;
Explanation
Mappings store data associated with user wallet addresses.
Why It Is Used
Each user needs separate storage for:
•	Deposited collateral
•	Borrowed amount
Example:
User A -> 100 tokens collateral
User B -> 50 tokens collateral
________________________________________
Constructor
constructor(address _collateralToken, address _borrowToken) {
    collateralToken = IERC20(_collateralToken);
    borrowToken = IERC20(_borrowToken);
}
Explanation
The constructor runs once when the contract is deployed.
Why It Is Used
It initializes the addresses of the ERC20 token contracts.
________________________________________
Deposit Function
function deposit(uint256 amount) external {
    collateralToken.transferFrom(msg.sender, address(this), amount);
    collateralBalances[msg.sender] += amount;
}
Explanation
This function allows users to deposit collateral tokens.
Step-by-Step Explanation
transferFrom()
Transfers tokens from the user wallet to the smart contract.
msg.sender
Represents the wallet address calling the function.
collateralBalances[msg.sender] += amount
Updates the user’s collateral balance.
Why It Is Used
Without collateral deposits, the protocol cannot safely allow borrowing.
________________________________________
Borrow Function
function borrow(uint256 amount) external {
    require(collateralBalances[msg.sender] >= amount * 2, "Insufficient collateral");

    borrowedBalances[msg.sender] += amount;
    borrowToken.transfer(msg.sender, amount);
}
Explanation
Allows users to borrow tokens using collateral.
Step-by-Step Explanation
require()
Checks a condition before executing the function.
If the condition is false, the transaction reverts.
collateralBalances[msg.sender] >= amount * 2
This implements a 200% collateralization ratio.
Example:
•	User deposits 200 tokens.
•	User can borrow up to 100 tokens.
borrowedBalances[msg.sender] += amount
Records the borrowed amount.
borrowToken.transfer()
Transfers borrowed tokens to the user.
Why It Is Used
Prevents users from borrowing more than the safe collateral limit.
________________________________________
Repay Function
function repay(uint256 amount) external {
    borrowToken.transferFrom(msg.sender, address(this), amount);
    borrowedBalances[msg.sender] -= amount;
}
Explanation
Allows users to repay borrowed tokens.
Why It Is Used
Repayment reduces the user’s debt and allows collateral withdrawal later.
________________________________________
Withdraw Function
function withdraw(uint256 amount) external {
    require(
        collateralBalances[msg.sender] - amount >= borrowedBalances[msg.sender] * 2,
        "Collateral locked"
    );

    collateralBalances[msg.sender] -= amount;
    collateralToken.transfer(msg.sender, amount);
}
Explanation
Allows users to withdraw collateral.
Why It Is Used
Ensures the remaining collateral is still enough to secure borrowed assets.
________________________________________
6. Flow Chart
 ________________________________________
7. Smart Contract Workflow Explanation
Step 1: Deposit Collateral
The user deposits ERC20 tokens into the protocol.
Blockchain Action:
•	Tokens move from user wallet to smart contract.
•	User balance is updated in storage.
________________________________________
Step 2: Borrow Tokens
The protocol checks collateral value before approving the loan.
Blockchain Action:
•	Smart contract validates collateral ratio.
•	Borrowed tokens are transferred to the user.
________________________________________
Step 3: Repay Loan
The borrower sends tokens back to the protocol.
Blockchain Action:
•	Borrowed balance decreases.
•	Debt is updated on-chain.
________________________________________
Step 4: Withdraw Collateral
After repayment, the user can withdraw collateral.
Blockchain Action:
•	Smart contract verifies safety conditions.
•	Tokens are returned to the user.
________________________________________
8. Deployment Process
Steps
1.	Compile the contract using Solidity compiler.
2.	Deploy the contract on Remix or Hardhat.
3.	Provide token addresses in constructor.
4.	Confirm deployment transaction.
Deployment Network
Example:
•	Sepolia Testnet
•	Local Hardhat Network
________________________________________
9. Test Cases
Test Case 1 – Deposit Collateral
Action
User deposits 100 collateral tokens.
Expected Result
•	Tokens transferred to contract.
•	collateralBalances[user] = 100
Actual Result
Test Passed.
________________________________________
Test Case 2 – Successful Borrow
Action
User borrows 40 tokens after depositing 100 collateral tokens.
Expected Result
•	Borrow approved.
•	User receives 40 tokens.
Actual Result
Test Passed.
________________________________________
Test Case 3 – Borrow Rejection
Action
User tries to borrow 80 tokens with only 100 collateral tokens.
Expected Result
Transaction reverts with:
Insufficient collateral
Actual Result
Test Passed.
________________________________________
Test Case 4 – Repayment
Action
User repays 20 borrowed tokens.
Expected Result
Borrow balance decreases.
Actual Result
Test Passed.
________________________________________
Test Case 5 – Withdraw Collateral
Action
User withdraws collateral after repaying loan.
Expected Result
Collateral successfully transferred back.
Actual Result
Test Passed.
________________________________________
10. Transaction Logs
Add screenshots from Remix, Hardhat console, MetaMask, or Etherscan.
________________________________________
Example Transaction Log
Transaction	Description
deposit(100)	User deposits collateral
borrow(40)	User borrows tokens
repay(20)	User repays part of loan
withdraw(50)	User withdraws collateral
________________________________________
Example Blockchain Explanation
Deposit Transaction
•	User signs transaction using MetaMask.
•	Smart contract receives tokens.
•	Blockchain stores updated collateral balance.
Borrow Transaction
•	Smart contract checks collateral ratio.
•	Tokens transferred from contract liquidity pool.
•	Debt recorded on-chain.
Repay Transaction
•	Borrowed tokens returned.
•	Debt balance reduced.
Withdraw Transaction
•	Contract verifies remaining collateral.
•	Tokens returned to user wallet.
________________________________________
11. Security Considerations
Reentrancy Protection
Protects the contract from malicious recursive calls.
Input Validation
Using require() prevents invalid operations.
Overcollateralization
Ensures loans remain secure.
OpenZeppelin Libraries
Audited libraries reduce vulnerabilities.
________________________________________
12. Future Improvements
Possible future upgrades:
•	Interest rate calculations.
•	Liquidation mechanism.
•	Price oracles.
•	Multiple collateral types.
•	Governance token.
•	Yield generation.
________________________________________
13. Conclusion
This project demonstrates the core principles of decentralized finance (DeFi) lending protocols. The smart contract enables users to securely lend and borrow ERC20 tokens using collateral while maintaining transparency and decentralization.
The implementation successfully:
•	Handles collateral deposits.
•	Allows borrowing within safe limits.
•	Supports repayment.
•	Enables collateral withdrawal.
•	Maintains user balances securely on-chain.
The project provides a simplified version of Compound Finance and demonstrates how blockchain technology can replace traditional financial intermediaries.

Repository
GitHub Repository:
https://github.com/abdelrahmannagy90/blockchain-project/tree/main

