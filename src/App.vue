<template>
  <div id="app">
    <TwoLists/>
    
  </div>
</template>

<script>
import TwoLists from './components/TwoLists.vue';

export default {
  name: 'app',
  components: {
    TwoLists
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
