<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="logo">网址导航示例</div>
      </el-header>
      <el-main>
        <div class="search-cont">
          <div class="bg-top"></div>
          <div class="search-box">
            <ul class="search-tab el-row">
              <li
                v-for="item in allSearchSelect"
                @click="toggleSearch(item)"
                :key="item.name"
                :class="{ active: item.name === activeSearchSelect.name }"
                class="search-tab-item"
              >
                {{ item.title }}
              </li>
            </ul>
            <form :action="activeSearchSelect.url" target="_blank">
              <el-input
                v-model="search"
                placeholder="请输入关键词搜索"
                class="input-with-select"
              >
                <template slot="prepend">
                  <span
                    class="search-logo"
                    :class="activeSearchSelect.name"
                  ></span>
                </template>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="openSearchPage"
                ></el-button>
              </el-input>
            </form>
          </div>
        </div>
        <div class="link-cont">
          <home-panel title="热门推荐">
            <div class="link-info">
              <el-row :gutter="20">
                <el-col
                  :xs="3"
                  :sm="3"
                  :md="3"
                  :lg="3"
                  :xl="3"
                  v-for="(hot, index) in hotLinkData"
                  :key="index"
                >
                  <a class="hot-link link-top" :href="hot.url" target="_blank">
                    <img :src="hot.img" alt="" />
                    <span>{{ hot.name }}</span>
                  </a>
                </el-col>
              </el-row>
            </div>
          </home-panel>
          <home-panel v-for="(kind , index) in showKind" :key="index" :title="kind.text" :icon="kind.icon">
            <el-row :gutter="20">
              <el-col
                :xs="12"
                :sm="8"
                :md="4"
                :lg="4"
                :xl="3"
                v-for="(link, index) in kind.links"
                :key="index"
              >
                <a class="hot-link" :href="link.url" target="_blank">
                  <img :src="link.img" alt="" />
                  <span>{{ link.name }}</span>
                  <p class="desc">
                    {{ link.desc }}
                  </p>
                </a>
              </el-col>
            </el-row>
          </home-panel>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HomePanel from "@/components/HomePanel.vue";

export default {
  name: "home",
  data: function() {
    return {
      search: "",
      allSearchSelect: [
        {
          logo: "",
          title: "百度",
          name: "baidu",
          url: "http://www.baidu.com/s?wd="
        },
        {
          logo: "",
          title: "必应",
          name: "bing",
          url: "https://cn.bing.com/search?q="
        },
        {
          logo: "",
          title: "花瓣网",
          name: "huaban",
          url: "https://huaban.com/search/?q="
        },
        {
          logo: "",
          title: "阿里图标",
          name: "iconfont",
          url: "https://www.iconfont.cn/search/index?q="
        }
      ],
      activeSearchSelect: {
        logo: "",
        title: "百度",
        name: "baidu",
        url: "http://www.baidu.com/s?wd="
      },
      kindList:[
        {
          code:"1",
          icon:"paperclip",
          text:"常用网站"
        },
        {
          code:"2",
          icon:"document",
          text:"文档"
        },
        {
          code:"3",
          icon:"brush",
          text:"平面设计"
        },
        {
          code:"4",
          icon:"eleme",
          text:"示例"
        },
      ],
      linkData: [
        {
          img:
            "https://img.alicdn.com/imgextra/i3/2590951958/O1CN019KfYOB1QKo53K435W_!!2590951958.jpg",
          name: "百度",
          kindCode: "1",
          url: "https://www.baidu.com/",
          hot: true,
          desc: "百度一下，你就知道"
        },
        {
          img:
            "https://img.alicdn.com/imgextra/i4/2590951958/O1CN01OrLAMj1QKo53dpnFP_!!2590951958.jpg",
          name: "12306",
          kindCode: "3",
          url: "https://www.12306.cn/index/",
          hot: false,
          desc: "中国铁路购票网站"
        },
        {
          img:
            "https://img.alicdn.com/imgextra/i4/2590951958/O1CN015gN8d51QKo56cskMu_!!2590951958.jpg",
          name: "58同城",
          kindCode: "2",
          url: "https://www.58.com/",
          hot: true,
          desc: "找房子找工作，上58同城"
        },
        {
          img:
            "https://img.alicdn.com/imgextra/i2/2590951958/TB2jfVJxQ9WBuNjSspeXXaz5VXa_!!2590951958.png",
          name: "搜狐",
          kindCode: "1",
          url: "http://www.sohu.com/",
          hot: false,
          desc: "中国加油，武汉加油"
        }
      ],
      hotLinkData: []
    };
  },
  methods: {
    toggleSearch: function(item) {
      this.activeSearchSelect = item;
    },
    openSearchPage: function() {
      window.open(this.activeSearchSelect.url + this.search, "_blank");
    },
    linkKind(){
      // 遍历出每个分类的数据
      for (let i = 0; i < this.kindList.length; i++){
        let code = this.kindList[i].code;
        let kindLink = this.linkData.filter(function(e){
          return (e.kindCode == code)
        })
        this.kindList[i].links = kindLink;
      }
      // console.log(this.kindList);
    }
  },
  created: function() {
    this.hotLinkData = this.linkData.filter(function(e) {
      return (e.hot == true);
    });
     this.linkKind();
  },
  mounted:function(){
    
  },
  computed:{
    showKind: function(){
      return this.kindList.filter(function(item){
        if(item.links != 0){
          return item
        }
      })
    }
  },
  components: {
    // HelloWorld
    HomePanel
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  .logo {
    line-height: 60px;
    font-weight: 600;
    color: #f9ca05;
  }
}
.search-cont {
  position: relative;
  width: 100%;
  height: 270px;
  background: {
    color: #5a5a6c;
    image: url(../assets/bg.jpg);
    size: 1920px auto;
    repeat: no-repeat;
    position: center;
    attachment: fixed;
  }
  .bg-top {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(26, 31, 59, 0.7);
  }
}

.el-main {
  padding: 0 !important;
  background-color: #f5f7fa;
}
.link-cont {
  padding: 30px 30px 10px 30px;
  .link-info {
    padding: 0 20px;
  }
}
.hot-link {
  position: relative;
  display: block;
  margin: 10px auto;
  text-decoration: none;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 26px;
    height: 26px;
    vertical-align: middle;
    border: 1px solid #eee;
    // border-radius: 50%;
  }
  span {
    margin-left: 32px;
    color: rgb(96, 98, 102);
    font-size: 14px;
    line-height: 26px;
  }
  .desc {
    color: #909399;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: inherit;
    transition: all 0.3s;
    margin: 0 0 0 32px;
  }
}
</style>
