import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getWeb3 from './util/getWeb3';
// import pollWeb3 from './util/pollWeb3';
import getContract from './util/getContract';

Vue.use(Vuex);

const store = new Vuex.Store({
 strict: false,
 state,
 mutations: {
    registerWeb3Instance (state, payload) {
        // eslint-disable-next-line
        console.log('registerWeb3instance Mutation being executed', payload)
        const result = payload;
        const web3Copy = state.web3;
        web3Copy.version = result.version;
        web3Copy.coinbase = result.coinbase;
        web3Copy.networkId = result.networkId;
        web3Copy.balance = parseInt(result.balance, 10);
        web3Copy.isInjected = result.injectedWeb3;
        web3Copy.web3Instance = result.web3;
        state.web3 = web3Copy;
        // pollWeb3();
    },
    registerContractInstance (state, payload) {
      // eslint-disable-next-line
      console.log('registerContractInstance', payload);
      state.contractInstance = payload;
    },
 },
 actions: {
    getContractInstance ({commit}) {
      getContract.then(result => {
        // eslint-disable-next-line
        console.log('getContract', result);
        commit('registerContractInstance', result);
      }).catch(
        // eslint-disable-next-line
        e => console.log(e)
      );
    },
    pollWeb3 ({commit}, payload) {
      // eslint-disable-next-line
      console.log('pollWeb3 action being executed')
      commit('pollWeb3Instance', payload)
    },
    pollWeb3Instance (state, payload) {
      // eslint-disable-next-line
      console.log('pollWeb3Instance mutation being executed', payload)
      state.web3.coinbase = payload.coinbase;
      state.web3.balance = parseInt(payload.balance, 10);
    },
    registerWeb3 ({commit}) {
        // eslint-disable-next-line
        console.log('registerWeb3 Action being executed');
        getWeb3.then(result => {
          // eslint-disable-next-line
          console.log('committing result to registerWeb3Instance mutation');
          commit('registerWeb3Instance', result);
        }).catch(e => {
          // eslint-disable-next-line
          console.log('error in action registerWeb3', e);
        })
    },
 },
});

export default store;