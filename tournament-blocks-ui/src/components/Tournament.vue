<template>
  <div class="tournament">
      <div>
        <h1>Tournament at Address {{address}}</h1>
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
      address: '0x0',
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
      this.address = this.$store.state.contractInstance.options.address;
      this.$store.state.contractInstance.methods.admin().call().then((result) => {
        // eslint-disable-next-line
        console.log('Got tournament admin', result);
        this.admin = result;
      });
      this.$store.state.contractInstance.methods.title().call().then((result) => {
        // eslint-disable-next-line
        console.log('Got tournament title', result);
        this.title = result;
      });
      this.$store.state.contractInstance.methods.startDateTime().call().then((result) => {
        // eslint-disable-next-line
        console.log('Got tournament start', result);
        this.start = result;
      });
      this.$store.state.contractInstance.methods.endDateTime().call().then((result) => {
        // eslint-disable-next-line
        console.log('Got tournament end', result);
        this.end = result;
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
      this.$store.state.contractInstance.methods.setDetails(this.title, this.start, this.end).send({from: this.admin}).then(() => {
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