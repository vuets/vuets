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
