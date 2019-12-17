<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="imgdiv">
      <div class="imgs"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.imgs {
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(../assets/imgs/0b54be04b6b24b29da6baeca96d5ec0c.jpg);
  position: absolute;
  width: 300px;
  height: 100%;
}
</style>
