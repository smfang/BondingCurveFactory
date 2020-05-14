const { 
    ethers,
    etherlime,
    TokenAbi,
    CurveAbi,
    CollateralTokenAbi,
    initSettings,
    testSettings
} = require("./test.settings.js");

describe("💪 Token Tests", async () => {
    let insecureDeployer = accounts[0];
    let user = accounts[1];
    
    let tokenInstance;
    let curveInstance;
    let collateralInstance;

    beforeEach('', async () => {
        let deployer = new etherlime.EtherlimeGanacheDeployer(insecureDeployer.secretKey);
        
        curveInstance = await deployer.deploy(
            CurveAbi,
            false
        );

        collateralInstance = await deployer.deploy(
            CollateralTokenAbi,
            false,
            initSettings.tokenInit.name,
            initSettings.tokenInit.symbol
        );

        tokenInstance = await deployer.deploy(
            TokenAbi,
            false,
            curveInstance.contract.address,
            initSettings.tokenInit.maxSupply,
            initSettings.tokenInit.a,
            initSettings.tokenInit.b,
            initSettings.tokenInit.c,
            initSettings.tokenInit.name,
            initSettings.tokenInit.symbol,
            collateralInstance.contract.address
        );
    });

    it("💰 Get token price", async () => {
        let buyPrice = await tokenInstance.getBuyCost(testSettings.buy.mintAmount);

        assert.equal(
            buyPrice.toString(),
            testSettings.buy.mintedTokens,
            "Unexpected amount of minted tokens"
        );
    });

    it("🤑 Buy Tokens", async () => {
        let buyPrice = await tokenInstance.getBuyCost(testSettings.buy.mintAmount);

        await collateralInstance.from(user).buy(buyPrice);
        await collateralInstance.from(user).approve(
            tokenInstance.contract.address,
            buyPrice
        );

        await tokenInstance.from(user).buy(
            testSettings.buy.mintAmount
        );

        let userBalance = await tokenInstance.balanceOf(user.signer.address);

        assert.equal(
            userBalance.toString(),
            testSettings.buy.mintAmount,
            "User balance incorrect"
        );
    });

    
});