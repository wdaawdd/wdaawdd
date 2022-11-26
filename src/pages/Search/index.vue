<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">

        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <li class="with-x" v-show="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <li class="with-x" v-show="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>
            <li class="with-x" v-show="searchParams.props"
            v-for="(prop,index) in searchParams.props"
            :key="index"
            >
            {{prop.split(":")[1]}}
            <i @click="removePropos(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector 
        @trademarkInfo="trademarkInfo"
        @attrValueInfo="attrValueInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              
            </ul>
          </div>

          <!-- 分页器 -->
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import SearchSelector from './SearchSelector/SearchSelector'
import { mapState, mapAction, mapGetters } from 'vuex';
export default {
  name: 'indexSearch',
  components: {
    SearchSelector
  },
  data() {
    return {
      //给服务器传递的搜索数据
      searchParams:{
      "category3Id": "",
      "categoryName": "",
      "keyword": "",
      "order": "",
      "pageNo": 1,
      "pageSize":3,
      "props": [],
      "trademark": ""
    },
    }
  },
  //组件挂载完毕前执行一次
  beforeMount(){
    //把路由搜索的数据传给searchParmas
   Object.assign(this.searchParams,this.$route.query,this.$route.params)
  },
  //组件挂载完毕后执行一次
  mounted() {
    this.getData()
  },
  //???报错
    // methods:{
    //   ...mapAction("Search",["getSearchList"])
    // }
  methods:{
    //发送数据到仓库，获取服务器返回数据
    getData(){
      this.$store.dispatch("Search/getSearchList",this.searchParams);
    },

    //面包屑的删除
      //删除三级路由筛选
      removeCategoryName(){
        this.searchParams.categoryName = undefined
        //给服务器传参时undefinned不传，但属性值为空的字段仍会带给服务器
          this.searchParams.category1Id = undefined
          this.searchParams.category2Id = undefined
          this.searchParams.category3Id = undefined
        //路由跳转
        this.$router.push({name:"search",params:this.$route.params})
      },
      //删除关键字
      removeKeyword(){
        this.searchParams.keyword = ''
        //另一个面包屑（三级路由 不修改，所以手动加上
        this.$router.push({name:"search",query:this.$route.query})
      },
      //删除子组件的品牌
      removeTrademark(){
        this.searchParams.trademark = ''
        this.getData()
      },
      //删除子组件的属性
      removePropos(index){
        //splice属性删除下标为index的数组
        this.searchParams.props.splice(index,1)
        this.getData()
      },

      //添加到面包屑
      //品牌选择标签
      trademarkInfo(trademark){
        //接口类型  "ID:品牌名称"
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        //跳转路由
        this.getData()
      },
      //属性选择标签
      attrValueInfo(attr,index){
        //接口类型  "属性ID:属性值:属性名"  ["2:6.0～6.24英寸:屏幕尺寸"]
        let props = `${attr.attrId}:${attr.attrValueList[index]}:${attr.attrName}`
        //设置判断
        //1:出现重复的（不操作 0:添加操作 2:出现同NAme不同值（修改）
        let flag = 0
        let i=0
        for(;i<this.searchParams.props.length;i++) {
          let e = this.searchParams.props[i].split(":")
          //当遍历完有一样的函数时，flag=1 不添加
          //当遍历完有一样的属性，但值不同时，flag=2 改变
          //flag=0,遍历完没有一样的函数，添加
          if(e[2]==attr.attrName && e[1]!=attr.attrValueList[index]){
            flag = 2
            break
          }
          if(e[2]==attr.attrName && e[1]==attr.attrValueList[index]){
            // console.log("出现重复")
            flag = 1
            break
          }
        }
          if(flag == 0){
            // console.log("添加")
            this.searchParams.props.push(props)
          }
          if(flag == 2){
            // console.log("修改")
            this.searchParams.props[i] = attr.attrValueList[index]
          } 
        this.getData()
        
      } 
      
  },
  computed: {
    ...mapGetters("Search", ["goodsList"])
  },
  //监测搜索条件变化（可以多次搜索）
  watch:{
      $route :{
      deep:true,
      handler(newValue,oldValue){
        //新数据传给仓库去调用服务器接口
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        this.getData()
        //要清空数据，否则会搜索逻辑错误
        // this.searchParams.keyword = ''
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
      }
    }


  }
}

</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>