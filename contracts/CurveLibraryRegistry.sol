pragma solidity 0.6.6;

contract CurveLibraryRegistry {
    address private factory_;

    constructor(address _factory) public {
        factory_ = _factory;
    }

    modifier onlyFactory() {
        require(
            msg.sender == factory_,
            "Only the factory may use this"
        );
        _;
    }
    
    function createCurve(
        uint8 _curveType
    )
        public
        onlyFactory()
        returns(bool)
    {
        
    }
}