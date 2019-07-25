# TournamentBlocks

An Ethereum/Solidity based blockchain dApp for scheduling of sports tournaments.

## Rationale

This project will model competitive tournaments and allow for various sports, divisions, competitors and matches to be
documented on the Ethereum blockchain for purposes of posterity.  It will allow anyone to host tournaments and record
the results immutably onto the Ethereum blockchain.  

## Disclaimer

Currently this project is a work in progress and any use of the implementation is at the risk of the end user.  

## Dependencies

This project relies upon some common frameworks:

* Node [tested against 10.16.0]: https://nodejs.org/en/
* VueJS/Vue-cli [tested against 3.9.3]: https://vuejs.org and https://cli.vuejs.org
* Truffle [tested against v5.0.18]: https://www.trufflesuite.com
* Solidity [tested against v0.5.9]: https://solidity.readthedocs.io/en/v0.5.10/
* Ganache CLI [tested against v6.4.3]: https://github.com/trufflesuite/ganache-cli

## Setup

Install the above dependencies by following the installation instructions from the provided dependencies.

The project is divided into a main blockchain layer contained in the root of the TournamentBlocks checkout and a
separate VueJS based UI contained within the tournament-blocks-ui sub-project.  

### Truffle development

The TournamentBlocks root project is currently setup to run again the ganache-cli test blockchain, which defaults to the port 8545.  

`truffle compile` - compiles the contracts
`truffle migrate` - deploys the contracts to the ganache-cli instance
`truffle test` - runs the tests defined in the test sub-directory

### VueJs development

The tournament-blocks-ui sub-project expects the vue-cli to be installed.  

`npm run serve` - runs a local dev server on port 8080 that support hot-reloading of local changes
`npm run build` - builds a 'production' version of the single page application that may be deployed to a static host such as Apache or nginx or AWS S3/Cloudfront.
`npm run lint` - will run the babel-eslint linter for code quality of the VueJS layer

## Future Development

As this project is a work-in-progress further changes will be occurring regularly, to possibly include: 

* UI support for all tournament methods
* Support for tournament brackets and ladders
* Support for automated tournament scheduling
* Export of tournaments to a JSON representation
* Support of tournament querying via GraphQL
