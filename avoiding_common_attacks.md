# Avoiding common attacks

## Re-entrancy attacks

The current design does not pass control to an external contract and so there is no current perceived danger from external contracts.
There is a possibility that future work may be done to have support of for-profit tournaments and so re-entrancy may  become a concern
in the future.

## Transaction Ordering and Timestamp Dependence

The current design does not upon the order of transaction as each change is atomic and isolated from exterior implications.

## Integer Overflow and Underflow

The only math performed in the current design is a reliance upon an increasing integer for generation of bytes32 identifiers.  It would 
be theoretically possibly to overflow identifiers by successively incrementing the base value past the uint256 range.  This possibility is limited by restricting the identifier generation to only the tournament administrator, who presumably will rationally use the generation for real tournament artifacts.  The likelihood of a single tournament of a limited number of divisions/sports/matches to overflow the uint256 boundary is considered extremely low in probability.

## Denial of Service

Similar to re-entrancy concerns, the current design does not transfer control to any external party and so it seems to be proof against typical denial of service attacks.

## Denial of Service by Block Gas Limit

By using the CRUD pattern describe in design_pattern_decisions, indeterminate array looping has been explicitly prevented.  

## Force Sending Ether

The current design does not contemplate monetary concerns and so the Tournament contract is not payable and does not define a payable fallback function.  This means that it should not be possible to send ether to the contract and all such attempts should revert the funds back to the caller.
