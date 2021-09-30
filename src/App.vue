<template>
  <MainPage></MainPage>
</template>

<script>
import MainPage from "./MainPage.vue";
export default {
  name: "App",
  components: { MainPage },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
body {
  margin: 0;
  padding: 10px;
}
</style>
