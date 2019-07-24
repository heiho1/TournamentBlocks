<template>
  <div class="tournament">
      <div>
        <h1>Tournament Details</h1>
        <p>Admin: {{admin}}</p>
        <p>Title: <input v-model="title" placeholder="Choose a tournament title" /></p>
        <p>Starts: <input v-model="start" placeholder="Choose a starting date/time" /></p>
        <p>Ends: <input v-model="end" placeholder="Choose an ending date/time" /></p>
        <button @click="update" :disabled="updating">Update Tournament</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'tournament',
  data () {
    return {
      updating: false,
      admin: null,
      title: null,
      start: null,
      end: null,
    }
  },
  beforeCreate () {
    // eslint-disable-next-line
    console.log('registerWeb3 Action dispatched from Tournament.vue');
    this.$store.dispatch('registerWeb3');

    // eslint-disable-next-line
    console.log('dispatching getContractInstance');
    this.$store.dispatch('getContractInstance').then(() => {
      this.$store.state.contractInstance.methods.admin().call().then((result) => {
        // eslint-disable-next-line
        console.log('Got tournament admin', result);
        this.admin = result;
      });
    });
  },
  methods: {
    update() {
      // eslint-disable-next-line
      console.log('Updating tournament', this.title, this.start, this.end);
      this.updating = true;
      // eslint-disable-next-line
      console.log(this.$store.state);
      this.$store.state.contractInstance.methods.setDetails(this.title, this.start, this.end).call().then(() => {
        // eslint-disable-next-line
        console.log('Tournament updated');
      });
      this.updating = false;
    },
  },
  mounted() {
  },
  components: {
  },
}
</script>

<style scoped>
</style>