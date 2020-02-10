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
              <!-- <li class="search-tab-item active">百度</li>
              <li class="search-tab-item">必应</li>
              <li class="search-tab-item">花瓣网</li>
              <li class="search-tab-item">阿里图标</li> -->
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
                <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                  <a class="hot-link link-top" href="#">
                    <img src="../assets/logo.png" alt="" />
                    <span>示例</span>
                  </a>
                </el-col>
              </el-row>
            </div>
          </home-panel>
          <home-panel title="常用网站" icon="paperclip">
            <el-row :gutter="20">
              <el-col :xs="12" :sm="8" :md="4" :lg="4" :xl="3">
                <a class="hot-link" href="#">
                  <img src="../assets/logo.png" alt="" />
                  <span>示例</span>
                  <p class="desc">
                    这是一个嘎哈的网站啊，到底胜多负少的顺丰到付是的发生
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
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
      }
    };
  },
  methods: {
    toggleSearch: function(item) {
      this.activeSearchSelect = item;
    },
    openSearchPage: function() {
      window.open(this.activeSearchSelect.url + this.search, "_blank");
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
