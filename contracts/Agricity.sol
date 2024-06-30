// contracts/Agricity.sol
pragma solidity ^0.8.0;

contract Agricity {
    address payable public government;
    mapping(address => bool) public eligibleBeneficiaries;
    event BeneficiaryRegistered(address beneficiary);
    event SubsidyDisbursed(address beneficiary, uint amount);

    constructor() {
        government = payable(msg.sender);
    }

    function registerBeneficiary() public {
        require(!eligibleBeneficiaries[msg.sender], "Beneficiary already registered");
        eligibleBeneficiaries[msg.sender] = true;
        emit BeneficiaryRegistered(msg.sender);
    }

    function disburseSubsidy(address beneficiary, uint amount) public payable {
        require(msg.sender == government, "Only government can disburse subsidy");
        require(eligibleBeneficiaries[beneficiary], "Beneficiary not registered");
        payable(beneficiary).transfer(amount);
        emit SubsidyDisbursed(beneficiary, amount);
    }
}
