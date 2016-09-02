<template>
<div>
  <div class="nav">
    <a v-link="'/home'">Home</a>
    <a v-link="'/hello'">Hello</a>
  </div>
  <router-view
    class="view"
    keep-alive
    transition
    transition-mode="out-in">
  </router-view>
</div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="less">
body {
  color: #333333;
}
.nav > a.active {
  font-weight: bold;
  font-size: 1.2em;
}
.view {
  transition: opacity .2s ease;

  &.v-enter,
  &.v-leave {
    opacity: 0;
  }
}
</style>

