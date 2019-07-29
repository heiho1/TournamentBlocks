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

* [Node](https://nodejs.org/en/) : tested against 10.16.0 
* [VueJS/Vue-cli](https://vuejs.org and https://cli.vuejs.org) : tested against 3.9.3
* [Truffle](https://www.trufflesuite.com) : tested against v5.0.18
* [Solidity](https://solidity.readthedocs.io/en/v0.5.10/) : tested against v0.5.9
* [Ganache CLI](https://github.com/trufflesuite/ganache-cli) : tested against v6.4.3

## Setup

Install the above dependencies by following the installation instructions from the provided dependencies.

The project is divided into a main blockchain layer contained in the root of the TournamentBlocks checkout and a
separate VueJS based UI contained within the tournament-blocks-ui sub-project.  

## Usage

The tournament-blocks-ui user interface integrates with [MetaMask](https://metamask.io/) and has been tested via deployment using the [Remix IDE](http://remix.ethereum.org).  You may freely deploy Tournament.sol to any blockchain which supports the declared Solidity version, currently version ^0.5.0.  The tournament UI may be configured to use your deployed contract by updating the file tournament-blocks-ui/src/util/tournamentContract.js.  In this file set 

* address to the address of the tournament deployment
* ABI to the ABI of the deployed tournament 

To test the integration, follow the instructions defined in the "VueJS development" below to run a development server or deploy the UI build distribution to a suitable HTTP server.

A demo video of basic usage is in the demo/ sub-folder.  You may view a large size version of the demo at https://www.screencast.com/t/AtGsYjWOl as well.

### Truffle development

The TournamentBlocks root project is currently setup to run again the ganache-cli test blockchain, which defaults to the port 8545.  

`truffle compile` - compiles the contracts
`truffle migrate` - deploys the contracts to the ganache-cli instance
`truffle test` - runs the tests defined in the test sub-directory

### VueJS development

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
