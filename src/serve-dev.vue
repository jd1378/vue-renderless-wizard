<script>
import Vue from 'vue';
import Example1 from '../guide/Example1/Example1';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    Example1,
  },
});
</script>

<template>
  <div id="app">
    <Example1 />
  </div>
</template>

<style lang="css">
html {
  /* background: #232323;
  color: #cdcdcd; */
  font-family: 'Avenir Next', 'Avenir', sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.square {
  width: 50px;
  height: 50px;
}
</style>
