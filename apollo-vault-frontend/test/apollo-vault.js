// test/apollo-vault.js
const { expect } = require("chai");

describe("ApolloVault Contract", function () {
  let ApolloVault;

  beforeEach(async function () {
    [deployer] = await ethers.getSigners();

    const ApolloVault = await ethers.getContractFactory("ApolloVault");
    this.apolloVault = await ApolloVault.deploy();
  });

  it("Should register a new user and retrieve the user's address", async function () {
    const facialRecognitionHash = "0x1234567890abcdef";
    await this.apolloVault.registerUser(facialRecognitionHash);

    const userAddress = await this.apolloVault.getUserAddress(facialRecognitionHash);
    expect(userAddress).to.equal(deployer.address);
  });

  // Add more test cases as needed
});
