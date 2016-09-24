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

