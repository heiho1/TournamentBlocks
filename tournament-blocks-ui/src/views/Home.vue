<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <metamask />
    <tournament />
  </div>
</template>

<script>
// @ is an alias to /src
import Metamask from '@/components/Metamask';
import Tournament from '@/components/Tournament';

export default {
  name: 'home',
  components: {
    'metamask': Metamask,
    'tournament': Tournament,
  }
}
</script>
