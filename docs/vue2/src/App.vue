<template>
<div>
  <div class="nav">
    <router-link to="/home">Home</router-link>
    <router-link to="/hello">Hello</router-link>
  </div>
  <transition name="fade" mode="out-in">
    <keep-alive><router-view class="view"></router-view></keep-alive>
  </transition>
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
  transition: opacity .1s ease;

  &.fade-enter-active,
  &.fade-leave-active {
    opacity: 0;
  }
}
</style>

