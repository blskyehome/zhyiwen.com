<template>
  <div class="home-panel">
    <div class="panel-hd"><i :class="'el-icon-' + icon"></i> {{ title }}</div>
    <div class="panel-bd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: {
      type: String,
      default: "collection-tag"
    }
  }
};
</script>

<style lang="scss">
.home-panel {
  background-color: #fff;
  border: 1px solid rgb(220, 223, 230);
  border-radius: 4px;
  margin-bottom: 20px;
  .panel-hd {
    padding: 13px 16px;
    border-bottom: 1px solid rgb(242, 246, 252);
    line-height: 16px;
  }
  .panel-bd {
      padding: 20px;
  }
}
</style>
