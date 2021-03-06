<template>
  <div class="h-100 position-relative">
    <div class="ring-card-wrap overflow-hidden d-flex flex-column h-100 w-100">
      <div class="ring-card-header">{{ form.fd.name || '磁贴名称' }}<a-icon class="ml-2" type="loading" v-if="loading" /></div>
      <div class="d-flex flex-fill align-items-center ml-4 mr-4">
        <a-progress type="circle" :percent="percent" :strokeWidth="12" :status="status" :strokeColor="percentColor">
          <template v-slot:format><span class="percent-tips" :style="{ color: percentColor }">{{ percentTips }}</span></template>
        </a-progress>
        <div class="flex-fill ml-4">
          <div class="d-flex">
            <div class="flex-shrink-0 flex-grow-0">已用</div>
            <div class="ml-2 flex-fill text-right">{{ this.usage }}</div>
          </div>
          <div class="d-flex">
            <div class="flex-shrink-0 flex-grow-0">未使用</div>
            <div class="ml-2 flex-fill text-right">{{ this.displayUnUsage }}</div>
          </div>
          <div class="d-flex">
            <div class="flex-shrink-0 flex-grow-0">总量</div>
            <div class="ml-2 flex-fill text-right">{{ this.allUsage }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ring-card-action"><slot name="actions" :handle-edit="handleEdit" /></div>
    <base-drawer :visible.sync="visible" title="配置磁贴" @ok="handleSubmit">
      <a-form
        hideRequiredMark
        :form="form.fc"
        v-bind="formItemLayout">
        <a-form-item label="磁贴名称">
          <a-input v-decorator="decorators.name" />
        </a-form-item>
        <quota-config :fc="form.fc" :decorators="decorators" />
      </a-form>
    </base-drawer>
  </div>
</template>

<script>
import BaseDrawer from '@Dashboard/components/BaseDrawer'
import QuotaConfig from '@Dashboard/sections/QuotaConfig'
import { USAGE_CONFIG } from '@Dashboard/constants'

export const options = {
  label: '使用率',
  desc: '某个资源的使用率',
  thumb: require('./assets/thumb.svg'),
  h: 3,
  w: 5,
}

export default {
  name: 'Ring',
  components: {
    BaseDrawer,
    QuotaConfig,
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
    params: Object,
  },
  data () {
    return {
      data: {},
      visible: false,
      loading: false,
      form: {
        fc: this.$form.createForm(this),
        fd: {},
      },
      decorators: {
        name: [
          'name',
          {
            initialValue: this.params && this.params.name,
            rules: [
              { required: true, message: '请输入磁贴名称' },
            ],
          },
        ],
        cloud_env: [
          'cloud_env',
          {
            initialValue: this.params && this.params.cloud_env,
          },
        ],
        brand: [
          'brand',
          {
            initialValue: this.params && this.params.brand,
          },
        ],
        region: [
          'region',
          {
            initialValue: this.params && this.params.region,
          },
        ],
        account: [
          'account',
          {
            initialValue: this.params && this.params.account,
          },
        ],
        all_usage_key: [
          'all_usage_key',
          {
            initialValue: this.params && this.params.all_usage_key,
            rules: [
              { required: true, message: '请选择指标' },
            ],
          },
        ],
        usage_key: [
          'usage_key',
          {
            initialValue: this.params && this.params.usage_key,
            rules: [
              { required: true, message: '请选择指标' },
            ],
          },
        ],
      },
      formItemLayout: {
        wrapperCol: {
          span: 18,
        },
        labelCol: {
          span: 6,
        },
      },
    }
  },
  computed: {
    allUsageNumber () {
      return (this.data && this.data[this.form.fd.all_usage_key]) || 0
    },
    usageNumber () {
      return (this.data && this.data[this.form.fd.usage_key]) || 0
    },
    allUsageConfig () {
      return USAGE_CONFIG[this.form.fd.all_usage_key]
    },
    usageConfig () {
      return USAGE_CONFIG[this.form.fd.usage_key]
    },
    allUsage () {
      let ret = this.allUsageNumber
      if (this.allUsageConfig && this.allUsageConfig.formatter) {
        ret = this.allUsageConfig.formatter(ret)
      }
      if (this.allUsageConfig && this.allUsageConfig.unit) {
        ret = `${ret}${this.allUsageConfig.unit}`
      }
      return ret
    },
    usage () {
      let ret = this.usageNumber
      if (this.usageConfig && this.usageConfig.formatter) {
        ret = this.usageConfig.formatter(ret)
      }
      if (this.usageConfig && this.usageConfig.unit) {
        ret = `${ret}${this.usageConfig.unit}`
      }
      return ret
    },
    unUsage () {
      let ret = this.allUsageNumber - this.usageNumber
      if (
        (this.allUsageConfig && this.allUsageConfig.formatter) &&
        (this.usageConfig && this.usageConfig.formatter)
      ) {
        ret = this.usageConfig.formatter(ret)
      }
      if (
        (this.allUsageConfig && this.allUsageConfig.unit) &&
        (this.usageConfig && this.usageConfig.unit)
      ) {
        ret = `${ret}${this.usageConfig.unit}`
      }
      return ret
    },
    displayUnUsage () {
      return this.unUsage < 0 ? 0 : this.unUsage
    },
    percent () {
      if (this.usageNumber === 0 && this.allUsageNumber === 0) return 0
      return parseInt((this.usageNumber / this.allUsageNumber) * 100)
    },
    percentTips () {
      return `${this.percent} %`
    },
    percentColor () {
      if (this.percent < 80) {
        return '#52c41a'
      }
      if (this.percent < 100) {
        return '#faad14'
      }
      return '#f5222d'
    },
    status () {
      let ret = 'normal'
      if (this.percent > 100) {
        ret = 'exception'
      }
      return ret
    },
  },
  watch: {
    'form.fd' (val) {
      this.fetchUsage()
      for (let key in this.decorators) {
        let config = this.decorators[key][1] || {}
        config = {
          ...config,
          initialValue: val[key],
        }
        this.decorators[key][1] = config
      }
    },
  },
  destroyed () {
    this.um = null
  },
  created () {
    this.um = new this.$Manager('usages')
    if (this.params) {
      this.form.fd = this.params
    }
  },
  methods: {
    genUsageParams () {
      const params = {
        scope: this.$store.getters.scope,
        t: +new Date(),
      }
      const fd = this.form.fd
      if (fd.cloud_env) params.cloud_env = fd.cloud_env
      if (fd.region) params.region = fd.region
      if (fd.account) {
        params.range_type = 'cloudaccounts'
        params.range_id = fd.account
      }
      if (fd.brand) params.brand = fd.brand
      return params
    },
    async fetchUsage () {
      this.loading = true
      try {
        const params = this.genUsageParams()
        const response = await this.um.rpc({
          methodname: 'getGeneralUsage',
          params,
        })
        this.data = response.data
      } finally {
        this.loading = false
      }
    },
    handleEdit () {
      this.visible = true
    },
    async handleSubmit () {
      try {
        const values = await this.form.fc.validateFields()
        this.form.fd = values
        this.$emit('update', this.options.i, values)
        this.visible = false
      } catch (error) {
        throw error
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.ring-card-wrap {
  background-color: #fff;
  padding: 15px;
}
.ring-card-header {
  font-size: 14px;
}
.ring-card-action {
  position: absolute;
  right: 10px;
  top: 10px;
}
.percent-tips {
  font-size: 18px;
}
</style>
