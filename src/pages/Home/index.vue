<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <indexRank></indexRank>
    <indexLike></indexLike>
    <indexFloor></indexFloor>
    <indexBrand></indexBrand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer/index.vue"
import TodayRecommend from "./TodayRecommend/index.vue"
import indexRank from "./rank/index.vue"
import indexLike from "./like/index.vue"
import indexFloor from "./Floor/index.vue"
import indexBrand from "./Brand/index.vue"

export default {
name:"indexHome",
components:{
  ListContainer,
  TodayRecommend,
  indexRank,
  indexLike,
  indexFloor,
  indexBrand
}
}
</script>

<style>

</style>