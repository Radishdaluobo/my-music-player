<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--keep-alive标签的作用,将标签包裹的内容缓存起来-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from './components/header/header'
import Tab from 'components/tab/tab'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
