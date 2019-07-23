<template>
  <div class="tournament">
      <h1>Your Tournament Details</h1>
  </div>
</template>

<script>
export default {
 name: 'tournament',
  beforeCreate () {
      // eslint-disable-next-line
    console.log('registerWeb3 Action dispatched from Tournament.vue');
    this.$store.dispatch('registerWeb3');
  },
  components: {
  },
}
</script>

<style scoped>
</style>