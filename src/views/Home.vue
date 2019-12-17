<template>
  <div class="home">

    asdasdsaddsadasd
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />


  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
<style lang="less" scoped>
.imgs {
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-image: url(../assets/imgs/0.jpg);
}
</style>

