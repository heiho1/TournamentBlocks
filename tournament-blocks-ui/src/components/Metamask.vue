<template>
  <div class='metamask-info'>
    <h1>Metamask Info</h1>

    <p>Web3: {{ web3.version }}</p>
    <p>Network: {{ web3.networkId }}</p>
    <p>Account: {{ web3.coinbase }}</p>
    <p>Balance: {{ web3.balance }}</p>
  </div>
</template>

<script>
export default {
    name: 'metamask',
    computed: {
        web3 () {
            return this.$store.state.web3;
        },
    }
}
</script>

<style scoped>
</style>