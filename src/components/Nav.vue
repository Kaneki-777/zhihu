<template>
  <van-nav-bar
               :title="title"
               left-text="返回"
               left-arrow
               @click-left="onClickLeft" />
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Nav',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup() {
    const router = useRouter(),
      // eslint-disable-next-line no-unused-vars
      route = useRoute()
    console.dir(history)
    const onClickLeft = () => {
      router.back()
    }
    return {
      onClickLeft,
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .van-icon,
/deep/ .van-nav-bar_text {
  color: #000;
}
</style>
