// migrations/2_deploy_contracts.js
const Agricity = artifacts.require("Agricity");

module.exports = function (deployer) {
  deployer.deploy(Agricity);
};
