<template>
    <div class="tab">
        <div class="tab-item">
            <router-link to="/recommend">
                <span class="tab-link">推荐</span>
            </router-link>
        </div>
        <div class="tab-item">
            <router-link to="/singer">
                <span class="tab-link">歌手</span>
            </router-link>
        </div>
        <div class="tab-item">
            <router-link to="/rank">
                <span class="tab-link">排行</span>
            </router-link>
        </div>
        <div class="tab-item">
            <router-link to="/search">
                <span class="tab-link">搜索</span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
