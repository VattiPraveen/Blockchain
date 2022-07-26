// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract IfElse {
    string public stateVariable = "This is State variable";
    string public constant CONST = "Constant variable";

    function foo(uint256 x) public view returns (string memory) {
        if (x == 1) {
            return
                string(
                    abi.encodePacked(
                        "Viewing state vaiable from view function: ",
                        stateVariable
                    )
                );
        } else if (x == 2) {
            return
                string(
                    abi.encodePacked(
                        "Viewing constant vaiable from view function: ",
                        CONST
                    )
                );
        } else {
            string memory LocalVariable = pureFunction();
            return LocalVariable;
        }
    }

    function pureFunction() internal pure returns (string memory) {
        return "Local Variable from pureFunction";
    }
}
