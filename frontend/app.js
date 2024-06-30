// app.js
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");

const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "beneficiary",
          "type": "address"
        }
      ],
      "name": "BeneficiaryRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "SubsidyDisbursed",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "registerBeneficiary",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "disburseSubsidy",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "eligibleBeneficiaries",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "government",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
const contractAddress = "0x52E7d3499Fa26D94Dac275dcb53c5131D7e967b7"; // Your deployed contract address

const agricityContract = new web3.eth.Contract(contractABI, contractAddress);
  
document.getElementById('register').addEventListener('click', async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    alert("Registering beneficiary...");
  
    const receipt = await agricityContract.methods.registerBeneficiary().send({ from: accounts[0] });
    alert("Beneficiary registered successfully!\nTransaction receipt: " + JSON.stringify(receipt));
  } catch (error) {
    console.error("Error:", error);
    alert("Error registering beneficiary:\n" + error.message);
  }
});
  
document.getElementById('disburse').addEventListener('click', async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    const beneficiaryAddress = prompt("Enter beneficiary address:");
    const amount = prompt("Enter amount to disburse:");
  
    if (beneficiaryAddress && amount) {
      alert("Disbursing subsidy...");
  
      const receipt = await agricityContract.methods.disburseSubsidy(beneficiaryAddress, web3.utils.toWei(amount, 'ether'))
        .send({ from: accounts[0], value: web3.utils.toWei(amount, 'ether') });
      
      alert("Subsidy disbursed successfully!\nTransaction receipt: " + JSON.stringify(receipt));
    } else {
      alert("Beneficiary address or amount not provided.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error disbursing subsidy:\n" + error.message);
  }
});
