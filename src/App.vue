<script lang="ts">
import { defineComponent } from 'vue';
import MapDisplay from './components/MapDisplay.vue';

export default defineComponent({
  name: 'App',
  components: {
    MapDisplay,
  },
});
</script>

<template>
  <div id="app">
    <h1>Cambodia Loan Data Dashboard</h1>
    <MapDisplay />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

h1 {
  margin-bottom: 30px;
  color: #2c3e50;
}
</style>
