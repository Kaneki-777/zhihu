<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {
  }
}
</script>

<style lang="less">
html,
body {
  min-height: 100%;
  overflow-x: hidden;
  background: #f4f4f4;
}

#app {
  margin: 0 auto;
  background: #fff;
  height: 100vh;
}
</style>
