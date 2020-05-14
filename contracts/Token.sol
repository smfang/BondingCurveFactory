pragma solidity 0.6.6;

import "./I_Token.sol";
import "./I_Curve.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract Token is ERC20 {
    uint256 public maxSupply;
    uint256 public a;
    uint256 public b;
    uint256 public c;
    I_Curve public curveInstance;
    IERC20 public collateral;

    constructor(
        address _curveInstance,
        uint256 _maxSupply,
        uint256 _a,
        uint256 _b,
        uint256 _c,
        string memory _name,
        string memory _sybol,
        address _underlyingCollateral
    )
        ERC20(
            _name,
            _sybol
        )
        public 
    {
        curveInstance = I_Curve(_curveInstance);
        maxSupply = _maxSupply;
        a = _a;
        b = _b;
        c = _c;
        collateral = IERC20(_underlyingCollateral);
    }

    function getBuyCost(uint256 _tokens) public view returns(uint256) {
        return curveInstance.getBuyPrice(_tokens);
    } 
    
    function getCurve() external view returns (
        uint256,
        uint256,
        uint256
    ) {
        return (a, b, c);
    }

    function buy(uint256 _tokens) external {
        uint256 cost = getBuyCost(_tokens);

        

        _mint(msg.sender, _tokens);
    } 
}