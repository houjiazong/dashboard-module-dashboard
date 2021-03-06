<template>
  <div class="edit-wrap d-flex flex-column position-fixed">
    <!-- header -->
    <div class="edit-topbar position-relative d-flex justify-content-center align-items-center flex-grow-0 flex-shrink-0">
      <div class="mr-2">添加、 固定、 移动并调整磁贴大小</div>
      <a-button size="small" type="primary" @click="handleConfirm" :loading="submiting">完成自定义</a-button>
    </div>
    <!-- main -->
    <div class="edit-main position-relative flex-fill flex-nowrap align-items-stretch d-flex">
      <!-- extend gallery -->
      <extend-gallery
        ref="extend-gallery"
        class="extend-gallery position-relative" />
      <!-- edit main -->
      <main class="edit-content flex-fill position-relative">
        <div class="edit-content-inner w-100 h-100 position-absolute d-flex flex-column flex-nowrap">
          <div class="edit-header mb-2"><a-input ref="input" v-model="dashboardName" placeholder="输入仪表盘名称" /></div>
          <grid-shadow
            class="flex-fill"
            ref="grid-shadow">
            <grid-layout
                ref="grid-layout"
                :layout.sync="layout"
                :col-num="colNum"
                :max-rows="maxRows"
                :row-height="rowHeight"
                :margin="colMargin"
                :vertical-compact="false"
                :is-draggable="true"
                :is-resizable="true"
                :is-mirrored="false">
                <grid-item
                  class="edit-grid-item"
                  v-for="item in layout"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  :i="item.i"
                  :key="item.i"
                  :is-draggable="!item.isTemplate"
                  :is-resizable="!item.isTemplate"
                  :style="{ outline: item.isTemplate ? '2px dashed darkmagenta' : '' }">
                  <component :is="item.component" :options="item" :params="dashboardParams[item.i]" @update="handleUpdateDashboardParams">
                    <template v-slot:actions="{ handleEdit }">
                      <a-button type="link" icon="delete" @click="handleRemove(item)" />
                      <a-button type="link" icon="setting" @click="handleEdit" />
                    </template>
                  </component>
                </grid-item>
              </grid-layout>
          </grid-shadow>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import * as R from 'ramda'
import { mapGetters } from 'vuex'
import interact from 'interactjs'
import VueGridLayout from 'vue-grid-layout'
import GridShadow from '@Dashboard/components/GridShadow'
import ExtendGallery from '@Dashboard/sections/ExtendGallery'
import extendsComponents from '@Dashboard/extends'
import { uuid } from '@/utils/utils'
import storage from '@/utils/storage'

export default {
  name: 'DashboardEdit',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    GridShadow,
    ExtendGallery,
    ...extendsComponents,
  },
  data () {
    return {
      submiting: false,
      dashboardName: '',
      dashboardParams: {},
      layout: [],
      colNum: 56,
      rowHeight: 65,
      colMargin: [5, 5],
      maxRows: 34,
      defaultGridW: 2,
      defaultGridH: 2,
      currentOption: null,
      dashboardOptions: [],
    }
  },
  computed: {
    ...mapGetters(['scope']),
    id () {
      return this.$route.query.id
    },
    isCreate () {
      return !this.id
    },
  },
  watch: {
    dashboardOptions (val) {
      if (!this.isCreate) {
        const item = R.find(R.propEq('id', this.$route.query.id))(val)
        this.dashboardName = item.name
      }
    },
  },
  destroyed () {
    this.pm = null
  },
  created () {
    this.pm = new this.$Manager('parameters', 'v1')
    this.fetchDashboardOptions()
    if (!this.isCreate) {
      this.fetchDashboard()
    }
  },
  mounted () {
    this.extendGallery = this.$refs['extend-gallery']
    this.editMain = this.$refs['edit-main']
    this.dropzone = this.$refs['grid-shadow'].getContainerRef()
    this.dropzoneRect = this.dropzone.getBoundingClientRect()
    this.dropzoneY = this.dropzoneRect.y
    this.dropzoneX = this.dropzoneRect.x
    this.position = { x: 0, y: 0 }
    this.entered = false
    this.x = 0
    this.y = 0
    this.copy = null
    this.initItemInteract()
    this.initDropzoneInteract()
  },
  methods: {
    async fetchDashboardOptions () {
      try {
        const response = await this.pm.get({ id: `dashboard_${this.scope}` })
        if (response.data && response.data.value) {
          this.dashboardOptions = response.data.value || []
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.pm.create({
            data: {
              name: `dashboard_${this.scope}`,
              value: [],
            },
          })
        }
        throw error
      }
    },
    async fetchDashboard () {
      try {
        const response = await this.pm.get({ id: this.id })
        if (response.data && response.data.value) {
          this.setData(response.data.value)
        }
      } catch (error) {
        throw error
      }
    },
    initItemInteract () {
      interact('.extend-gallery-item').draggable({
        inertia: true,
        listeners: {
          start: event => {
            const component = event.target.dataset['component']
            this.setCurrentOption(component)
            this.copy = event.target.cloneNode(true)
            event.target.appendChild(this.copy)
            this.movingGridDeltaY = event.target.getBoundingClientRect().y
            this.tempId = `dashboard-item-${uuid(32)}`
          },
          move: event => {
            this.position.x += event.dx
            this.position.y += event.dy
            this.copy.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`
            this.copy.style.outline = '1px dashed darkmagenta'
            let { x: _x, y: _y } = (this.calcXY(this.position.y + this.movingGridDeltaY - this.dropzoneY, this.position.x - this.dropzoneX))
            this.x = _x
            this.y = _y
            if (this.entered) {
              let currentDragGridData = this.layout[this.layout.length - 1]
              currentDragGridData.x = _x
              currentDragGridData.y = _y
              this.$refs['grid-layout'].eventBus.$emit(
                'dragEvent',
                'dragmove',
                this.tempId,
                _x,
                _y,
                this.currentOption.w,
                this.currentOption.h,
              )
            }
          },
          end: event => {
            event.target.removeChild(this.copy)
            this.copy = null
            this.movingGridDeltaY = 0
            this.position = { x: 0, y: 0 }
            this.x = 0
            this.y = 0
          },
        },
      })
    },
    initDropzoneInteract () {
      interact(this.dropzone).dropzone({
        accept: '.extend-gallery-item',
        ondropactivate: event => {
          event.target.classList.add('drop-active')
        },
        ondragenter: event => {
          this.entered = true
          this.layout.push({
            x: this.x,
            y: this.y,
            w: this.currentOption.w,
            h: this.currentOption.h,
            i: this.tempId,
            isTemplate: true,
            component: this.currentOption.component,
          })
        },
        ondragleave: () => {
          this.entered = false
          this.layout.splice(this.layout.length - 1, 1)
        },
        ondrop: () => {
          this.entered = false
          this.layout[this.layout.length - 1].isTemplate = false
        },
        ondropdeactivate: event => {
          event.target.classList.remove('drop-active')
        },
      })
    },
    calcXY (top, left) {
      const colWidth = this.calcColWidth()
      let x = Math.round((left - this.colMargin[0]) / (colWidth + this.colMargin[0]))
      let y = Math.round((top - this.colMargin[1]) / (this.rowHeight + this.colMargin[1]))
      // Capping
      x = Math.max(Math.min(x, this.colNum - this.defaultGridW), 0)
      y = Math.max(Math.min(y, this.maxRows - this.defaultGridH), 0)
      return { x, y }
    },
    calcColWidth () {
      const placeholderGrid = this.$refs['grid-layout'].$children[0]
      return (placeholderGrid.containerWidth - (this.colMargin[0] * (this.colNum + 1))) / this.colNum
    },
    setCurrentOption (component) {
      this.currentOption = {
        component,
        ...this.extendGallery.extendsOptions[component],
      }
    },
    handleRemove (item) {
      const index = R.findIndex(R.propEq('i', item.i))(this.layout)
      this.layout.splice(index, 1)
    },
    handleUpdateDashboardParams (key, data) {
      this.dashboardParams[key] = data
    },
    updateDashboardOptions (id) {
      return new Promise((resolve, reject) => {
        const options = [ ...this.dashboardOptions ]
        const index = R.findIndex(R.propEq('id', id))(options)
        if (index !== -1) {
          options[index]['name'] = this.dashboardName
        } else {
          options.push({ id, name: this.dashboardName })
        }
        this.pm.update({
          id: `dashboard_${this.scope}`,
          data: {
            value: options,
          },
        }).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    createNewDashboard (id) {
      return new Promise((resolve, reject) => {
        this.updateDashboardOptions(id).then(() => {
          this.pm.create({
            data: {
              name: id,
              value: this.genData(),
            },
          }).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    async updateDashboard (id) {
      return new Promise((resolve, reject) => {
        this.updateDashboardOptions(id).then(() => {
          this.pm.update({
            id,
            data: {
              value: this.genData(),
            },
          }).then(response => {
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    async handleConfirm () {
      const layouts = this.layout.filter(item => this.dashboardParams[item.i])
      if (layouts.length <= 0) {
        this.$message.warn('请设置后进行保存')
        return
      }
      if (!R.trim(this.dashboardName)) {
        this.$message.warn('请输入面板名称')
        this.$refs.input.focus()
        return
      }
      this.submting = true
      try {
        let id = this.id
        let response
        if (this.isCreate) {
          id = `dashboard-${this.scope}-panel-${this.dashboardOptions.length + 1}`
          response = await this.createNewDashboard(id)
        } else {
          response = await this.updateDashboard(id)
        }
        if (response) {
          storage.set(`__oc_dashboard_${this.scope}__`, { id: response.data.name, name: this.dashboardName })
        }
        this.$router.push('/dashboard')
      } finally {
        this.submting = false
      }
    },
    // 设置视图所需的data
    setData (data) {
      const dashboardParams = {}
      const layout = []
      R.forEachObjIndexed((value, key) => {
        dashboardParams[key] = value.params
        layout.push({
          ...value.layout,
          i: key,
        })
      }, data)
      this.dashboardParams = dashboardParams
      this.layout = layout
    },
    // 生成需要存储到配置中的data
    genData () {
      const ret = {}
      const layouts = this.layout.filter(item => this.dashboardParams[item.i])
      for (let i = 0, len = layouts.length; i < len; i++) {
        const layout = layouts[i]
        ret[layout.i] = {
          layout: {
            x: layout.x,
            y: layout.y,
            w: layout.w,
            h: layout.h,
            component: layout.component,
          },
          params: this.dashboardParams[layout.i],
        }
      }
      return ret
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-wrap {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}
.edit-topbar {
  z-index: 5;
  box-shadow: 0 2px 4px 0 rgba(237, 237, 237, 0.5), 0 2px 4px 0 rgba(237, 237, 237, 0.5);
  height: 40px;
}
.edit-main {
  height: calc(100% - 40px);
}
.extend-gallery {
  z-index: 2;
  box-shadow: 4px 0px 5px 1px rgba(237, 237, 237, 0.5);
}
.edit-content {
  overflow: hidden;
  z-index: 1;
}
.edit-content-inner {
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  background-color: rgb(250, 250, 250);
  padding: 15px;
}
.edit-header {
  margin-left: 5px;
}

.edit-grid-item {
  user-select: none;
  background: rgba(0, 0, 0, .2);
}
::v-deep .drop-active {
  border: 2px dashed skyblue;
}
::v-deep .drop-active .vue-grid-item.vue-grid-placeholder {
  display: none;
}
</style>
