<template>
  <div id="block">
    <div class="container">

      <div class="page-title-container">
        <div class="page-title">
          <h3>Block Detail</h3>
          <h6 class="text-muted">Block's Detail Information</h6>
        </div>

        <div class="search-block">
          <block-search></block-search>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="block-title-container">
            <h3 class="hidden">Block Information</h3>
          </div>
          <div class="block">
            <block-block-detail :block="block" :uncles="uncles"></block-block-detail>
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-xs-12" v-if="!isUncle">
          <div class="block-title-container">
            <h3>Transactions</h3>
          </div>
          <div class="last-transactions-header">
            <li>TXn#</li>
            <li class="eth">ETH</li>
            <li class="limit">Gas Limit</li>
            <li class="gas">GWEI</li>
            <li></li>
          </div>
          <div class="block">
            <block-last-transactions :transactions="transactions"></block-last-transactions>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/states'
import chartOptions from '@/sampleData/chartData.json'
import { Block, common, Tx } from '@/libs'

export default Vue.extend({
  name: 'Block',
  props: ['blockHash'],
  data() {
    return {
      store: store,
      options: chartOptions,
      block: null,
      common: common,
      uncles: [],
      unixtimestamp: null,
      timestamp: null,
      transactions: []
    }
  },
  methods: {},
  computed: {
    isUncle() {
      return this.block && this.block.getIsUncle()
    }
  },
  mounted: function() {
    this.$socket.emit('getBlock', Buffer.from(this.blockHash.substring(2), 'hex'), (err, data) => {
      if (data) {
        this.block = new Block(data)

        let uncleHashes = this.block.getUncleHashes()
        this.$socket.emit('getBlockTransactions', this.block.getHash().toBuffer(), (err, data) => {
          this.transactions = data.map(_tx => {
            return new Tx(_tx)
          })
        })
        uncleHashes.forEach((_hash: any, idx: number) => {
          this.$socket.emit('getBlock', _hash.toBuffer(), (err, data) => {
            this.uncles.push(new Block(data))
          })
        })
      }
    })
  }
})
</script>

<style scoped lang="less">
@import '~lessPath/sunil/frames/blockDetail.less';
</style>
