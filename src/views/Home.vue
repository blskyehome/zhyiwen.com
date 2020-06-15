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
                  :sm="6"
                  :md="6"
                  :lg="4"
                  :xl="3"
                  v-for="(hot, index) in hotLinkData"
                  :key="index"
                >
                  <a class="hot-link link-top" :href="hot.url" target="_blank">
                    <img :src="hot.image" alt="" v-if="hot.image" />
                    <img src="../assets/testImg.png" alt="" v-else />
                    <span>{{ hot.name }}</span>
                  </a>
                </el-col>
              </el-row>
            </div>
          </home-panel>
          <home-panel
            v-for="(kind, index) in showKind"
            :key="index"
            :title="kind.name"
            :icon="kind.icon"
          >
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
                  <img :src="link.image" alt="" v-if="link.image" />
                  <img src="../assets/testImg.png" alt="" v-else />
                  <span>{{ link.name }}</span>
                  <p class="desc">
                    <i v-show="link.description">{{ link.description }}</i>
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
import link from "@/assets/linkTest.js";
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
          url: "http://www.baidu.com/s?wd=",
        },
        {
          logo: "",
          title: "必应",
          name: "bing",
          url: "https://cn.bing.com/search?q=",
        },
        {
          logo: "",
          title: "花瓣网",
          name: "huaban",
          url: "https://huaban.com/search/?q=",
        },
        {
          logo: "",
          title: "阿里图标",
          name: "iconfont",
          url: "https://www.iconfont.cn/search/index?q=",
        },
      ],
      activeSearchSelect: {
        logo: "",
        title: "百度",
        name: "baidu",
        url: "http://www.baidu.com/s?wd=",
      },
      kindList: [],
      linkData: [],
      hotLinkData: [],
    };
  },
  mounted() {
    let self = this;
    //加载页面初始化数据
  },
  methods: {
    // 初始化数据
    getCategory() {
      let self = this;

      self
        .axios({
          method: "get",
          url: "http://zhyiwen.com:9003/category?page=1",
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((cateData) => {
          self.kindList = cateData.data.result.records;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onLoadData() {
      let self = this;
      self
        .axios({
          method: "get",
          url: "http://zhyiwen.com:9003/link?page=1",
        })
        .then((linkData) => {
          self.linkData = self.linkData.concat(linkData.data.result.records);
          // console.log("category", self.kindList);
          // console.log("link", self.linkData);
          self.linkKind();
          self.hotLinkData = self.linkData.filter(function(e) {
            // console.log(e);
            return e.isHot == 1;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      self
        .axios({
          method: "get",
          url: "http://zhyiwen.com:9003/link?page=2",
        })
        .then((linkData) => {
          self.linkData = self.linkData.concat(linkData.data.result.records);
          // console.log("category", self.kindList);
          // console.log("link", self.linkData);
          self.linkKind();
          self.hotLinkData = self.linkData.filter(function(e) {
            // console.log(e);
            return e.isHot == 1;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      self
        .axios({
          method: "get",
          url: "http://zhyiwen.com:9003/link?page=3",
        })
        .then((linkData) => {
          self.linkData = self.linkData.concat(linkData.data.result.records);
          // console.log("category", self.kindList);
          // console.log("link", self.linkData);
          self.linkKind();
          self.hotLinkData = self.linkData.filter(function(e) {
            // console.log(e);
            return e.isHot == 1;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      self
        .axios({
          method: "get",
          url: "http://zhyiwen.com:9003/link?page=4",
        })
        .then((linkData) => {
          self.linkData = self.linkData.concat(linkData.data.result.records);
          // console.log("category", self.kindList);
          // console.log("link", self.linkData);
          self.linkKind();
          self.hotLinkData = self.linkData.filter(function(e) {
            // console.log(e);
            return e.isHot == 1;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      self
        .axios({
          method: "get",
          url: "http://zhyiwen.com:9003/link?page=5",
        })
        .then((linkData) => {
          self.linkData = self.linkData.concat(linkData.data.result.records);
          // console.log("category", self.kindList);
          // console.log("link", self.linkData);
          self.linkKind();
          self.hotLinkData = self.linkData.filter(function(e) {
            // console.log(e);
            return e.isHot == 1;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      self
        .axios({
          method: "get",
          url: "http://zhyiwen.com:9003/link?page=6",
        })
        .then((linkData) => {
          self.linkData = self.linkData.concat(linkData.data.result.records);
          // console.log("category", self.kindList);
          // console.log("link", self.linkData);
          self.linkKind();
          self.hotLinkData = self.linkData.filter(function(e) {
            // console.log(e);
            return e.isHot == 1;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toggleSearch: function(item) {
      this.activeSearchSelect = item;
    },
    openSearchPage: function() {
      window.open(this.activeSearchSelect.url + this.search, "_blank");
    },
    linkKind() {
      var self = this;
      // 遍历出每个分类的数据
      for (let i = 0; i < self.kindList.length; i++) {
        let code = self.kindList[i].id;
        let kindLink = self.linkData.filter(function(e) {
          return e.categoryId == code;
        });
        self.kindList[i].links = kindLink;
        console.log("遍历" + code);
      }
    },
  },
  created: function() {
    let self = this;
    self.getCategory();
    self.onLoadData();
  },
  computed: {
    showKind: function() {
      return this.kindList.filter(function(item) {
        if (item.links != 0) {
          return item;
        }
      });
    },
  },
  components: {
    HomePanel,
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  .logo {
    line-height: 60px;
    font-weight: 600;
    color: #5ddcb6;
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
    position: center bottom;
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
    .hot-link {
      span {
        display: none;
        @media only screen and (min-width: 768px) {
          display: inline-block;
        }
      }
    }
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
    // border: 1px solid #eee;
    // border-radius: 50%;
  }
  span {
    color: rgb(96, 98, 102);
    margin-left: 32px;
    font-size: 14px;
    line-height: 26px;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    overflow: hidden;
  }
  .desc {
    color: #909399;
    font-size: 12px;
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: inherit;
    transition: all 0.3s;
    margin: 0 0 0 32px;
    i {
      font-style: normal;
    }
  }
  &:hover {
    color: #5ddcb6;
    text-decoration: underline;
    span,
    .desc {
      color: inherit;
    }
  }
  &.link-top {
    height: 26px;
    text-align: center;
    img {
      position: initial;
    }
    @media only screen and (min-width: 768px) {
      text-align: left;
      img {
        position: absolute;
      }
    }
  }
}
</style>
