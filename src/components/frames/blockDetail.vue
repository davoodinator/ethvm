<template>
  <div id="block">
    <div class="container">
      <!-- Page Title -->
      <div class="page-title-container">
        <div class="page-title">
          <h3>Block Detail</h3>
          <h6 class="text-muted">Block's Detail Information</h6>
        </div>
        <div class="search-block">
          <block-search></block-search>
        </div>
        <!-- End Page Title -->
      </div>
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="block">
            <block-block-detail :block="block" :uncles="uncles"></block-block-detail>
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12" v-if="!isUncle">
          <div class="block-title-container">
            <h3>Block Transactions</h3>
          </div>
          <div class="block">
            <block-last-transactions :transactions="transactions" :showHeader="true"></block-last-transactions>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Block, common, Tx } from '@/libs'
import chartOptions from '@/sampleData/chartData.json'
import store from '@/states'
import Vue from 'vue'

export default Vue.extend({
  name: 'Block',
  props: ['blockHash'],
  data() {
    return {
      store,
      common,
      options: chartOptions,
      block: null,
      uncles: [],
      unixtimestamp: null,
      timestamp: null,
      transactions: []
    }
  },
  methods: {},
  computed: {
    isUncle() {
      if (this.block && this.block.getIsUncle()) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    /* Get Block Data: */
    this.$socket.emit('getBlock', Buffer.from(this.blockHash.substring(2), 'hex'), (err, data) => {
      if (data) {
        this.block = new Block(data)
        const uncleHashes = this.block.getUncleHashes()
        /*Get Transactions for the block: */
        this.$socket.emit('getBlockTransactions', this.block.getHash().toBuffer(), (error, dataTx) => {
          this.transactions = dataTx.map(_tx => {
            return new Tx(_tx)
          })
        })
        uncleHashes.forEach((_hash: any, idx: number) => {
          this.$socket.emit('getBlock', _hash.toBuffer(), (error, dataUncles) => {
            this.uncles.push(new Block(dataUncles))
          })
        })
      }
    })
  }
})
</script>

<style scoped lang="less">
@import '~lessPath/sunil/global.less';
</style>
