import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getWeb3 from './util/getWeb3';

Vue.use(Vuex);

const store = new Vuex.Store({
 strict: true,
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
    }
 },
 actions: {
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