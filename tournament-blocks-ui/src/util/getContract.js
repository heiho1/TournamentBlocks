import Web3 from 'web3';
import tournament from './tournamentContract';

// eslint-disable-next-line
const getContract = new Promise(function (resolve, reject) {
    const web3 = new Web3(window.web3.currentProvider);
    // eslint-disable-next-line
    console.log('Contract address', tournament.address);
    // eslint-disable-next-line
    console.log('Got contract ABI', tournament.ABI);
    const tournamentContract = new web3.eth.Contract(tournament.ABI, tournament.address);
    resolve(tournamentContract);
});

export default getContract;