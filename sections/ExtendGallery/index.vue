<template>
  <div class="extend-gallery-wrap d-flex flex-column">
    <div class="extend-gallery-title flex-grow-0 flex-shrink-0">磁贴库</div>
    <div class="extend-gallery-tips flex-grow-0 flex-shrink-0 d-flex">
      <div>2个磁贴</div>
      <div class="flex-fill text-right">可将任意磁贴拖动到仪表盘</div>
    </div>
    <div class="flex-fill extend-list">
      <ul>
        <li
          class="extend-gallery-item d-flex align-items-center"
          v-for="(item, key) in extendsOptions"
          :key="key"
          :data-component="key">
          <div class="extend-thumb"><img :src="item.thumb" /></div>
          <div class="extend-content ml-4 flex-fill">
            <div class="extend-title">{{ item.label }}</div>
            <div class="extend-desc text-color-help mt-1">{{ item.desc }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { extendsOptions } from '@Dashboard/extends'

export default {
  name: 'ExtendGallery',
  data () {
    return {
      extendsOptions,
    }
  },
}
</script>

<style lang="scss" scoped>
.extend-gallery-wrap {
  background-color: #fff;
  width: 300px;
  min-width: 300px;
}
.extend-gallery-title {
  padding: 15px;
  font-size: 16px;
  border-bottom: 1px solid #eee;
}
.extend-gallery-tips {
  font-size: 12px;
  padding: 15px;
  border-bottom: 1px solid #eee;
}
.extend-list {
  > ul {
    list-style: none;
    margin: 0;
    padding: 0 15px;
    li {
      padding: 15px 10px;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      touch-action: none;
      height: 100px;
      width: 100%;
      min-width: 100%;
      position: relative;
      z-index: 99;
      > li {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;
      }
    }
  }
}
.extend-thumb {
  width: 60px;
  height: 60px;
  overflow: hidden;
  > img {
    width: 100%;
    vertical-align: middle;
    text-align: center;
  }
}
.extend-desc {
  font-size: 12px;
}
</style>
