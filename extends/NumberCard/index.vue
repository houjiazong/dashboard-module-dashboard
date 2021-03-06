<template>
  <div class="h-100 position-relative">
    <div class="number-card-wrap overflow-hidden d-flex flex-column h-100 w-100">
      <div class="number-card-header">{{ form.fd.name || '磁贴名称' }}<a-icon class="ml-2" type="loading" v-if="loading" /></div>
      <div class="number-card-body primary-color d-flex flex-fill align-items-center">
        <div class="number-card-number mr-2">{{ this.usage.usage }}</div>
        <div class="number-card-unit">{{ this.usage.unit }}</div>
      </div>
    </div>
    <div class="number-card-action"><slot name="actions" :handle-edit="handleEdit" /></div>
    <base-drawer :visible.sync="visible" title="配置磁贴" @ok="handleSubmit">
      <a-form
        hideRequiredMark
        :form="form.fc"
        v-bind="formItemLayout">
        <a-form-item label="磁贴名称">
          <a-input v-decorator="decorators.name" />
        </a-form-item>
        <quota-config :fc="form.fc" :decorators="decorators" usage-label="指标" />
      </a-form>
    </base-drawer>
  </div>
</template>

<script>
import BaseDrawer from '@Dashboard/components/BaseDrawer'
import QuotaConfig from '@Dashboard/sections/QuotaConfig'
import { USAGE_CONFIG } from '@Dashboard/constants'

export const options = {
  label: '数字图',
  desc: '某项指标的统计数字',
  thumb: require('./assets/thumb.svg'),
  h: 2,
  w: 5,
}

export default {
  name: 'NumberCard',
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
    usage () {
      const ret = {
        usage: (this.data && this.data[this.form.fd.usage_key]) || 0,
      }
      const config = USAGE_CONFIG[this.form.fd.usage_key]
      if (config && config.formatter) {
        const fVal = config.formatter(ret.usage)
        const fValArr = fVal.split(' ')
        ret.usage = fValArr[0]
        ret.unit = fValArr[1]
      }
      if (config && config.unit) {
        ret.unit = config.unit
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
.number-card-wrap {
  background-color: #fff;
  padding: 15px;
}
.number-card-header {
  font-size: 14px;
}
.number-card-body {
  font-size: 36px;
}
.number-card-action {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
