<template>
  <div class="block">
    <Header></Header>
    <div class="block-container container" v-if="block">
      <div class="row">
        
        <div class="col-md-12">
          <div class="section-block-1">
            
            <div class="section-block-title">
              <p>Block Detail Information</p>
            </div>

            <table>
              
              <tbody>                
                <tr>
                  <td>Height</td>
                  <td>{{block.getNumber().toNumber()}}</td>
                </tr>                
                <tr>
                  <td>Logs</td>
                  <td>{{block.getLogsBloom().toString()}}</td>
                </tr>
                <tr>
                  <td>Timestamp</td>
                  <td>{{block.getNumber().toString()}}</td>
                </tr>
                <tr>
                  <td>Transactions</td>
                  <td>{{block.getTransactionCount()}}</td>
                </tr>
                <tr>
                  <td>Hash</td>
                  <td>{{block.getHash().toString()}}</td>
                </tr>
                <tr>
                  <td>Parent Hash</td>
                  <td>{{block.getParentHash().toString()}}</td>
                </tr>
                <tr>
                  <td>Uncles Hash</td>
                  <td>{{block.getSha3Uncles().toString()}}</td>
                </tr>
                <tr>
                  <td>Miner</td>
                  <td>{{block.getMiner().toString()}}</td>
                </tr>
                <tr>
                  <td>Nonce</td>
                  <td>{{block.getNonce().toString()}}</td>
                </tr>
                
                <tr>
                  <td>State Root</td>
                  <td>{{block.getStateRoot().toString()}}</td>
                </tr>
                <tr>
                  <td>Extra Data</td>
                  <td>{{block.getExtraData().toString()}}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{{block.getSize().toNumber()}}</td>
                </tr>
                <tr>
                  <td>Gas Limit</td>
                  <td>{{block.getGasLimit().toNumber()}}</td>
                </tr>
                <tr>
                  <td>Gas Used</td>
                  <td>{{block.getGasUsed().toNumber()}}</td>
                </tr>
                

                <tr>
                  <td>Transactions Root</td>
                  <td>{{block.getTransactionsRoot().toString()}}</td>
                </tr>

                <tr>
                  <td>Receipts Root</td>
                  <td>{{block.getReceiptsRoot().toString()}}</td>
                </tr>

                <tr>
                  <td>TX Fees</td>
                  <td>{{block.getTxFees().toEth()}} ETH</td>
                </tr>

                <tr>
                  <td>Block Reward</td>
                  <td>{{block.getBlockReward().toEth()}} ETH</td>
                </tr>


                <tr>
                  <td>Total BlockReward</td>
                  <td>{{block.getTotalBlockReward().toEth()}} ETH</td>
                </tr>
                <tr>
                  <td>SHA3 Uncles</td>
                  <td>{{block.getSha3Uncles().toString()}}</td>
                </tr>
                <tr>
                  <td>Difficulty</td>
                  <td>{{block.getDifficulty().toNumber()}}</td>
                </tr>
                <tr>
                  <td>Total Difficulty</td>
                  <td>{{block.getTotalDifficulty().toNumber()}}</td>
                </tr>



              </tbody>

            </table>
          </div>
        </div>



        <div class="col-md-12 hidden">
          <div class="section-block">
            <p class="title">Height {{block.getNumber().toNumber()}}</p>
            <p class="title">Timestamp {{block.getNumber().toString()}}</p>
            <p class="title">Transactions {{block.getTransactionCount()}}</p>
            <p class="title">Hash {{block.getHash().toString()}}</p>
            <p class="title">Parent Hash {{block.getParentHash().toString()}}</p>
            <p class="title">Uncles Hash {{block.getSha3Uncles().toString()}}</p>
            <p class="title">Miner {{block.getMiner().toString()}}</p>
          </div>
        </div>

      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/states'
import chartOptions from '@/sampleData/chartData.json'
import {Block, common} from '@/libs'
export default Vue.extend({
  name: 'Block',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      store: store,
      options: chartOptions,
      block: null,
      common: common
    }
  },
  methods: {},
  mounted: function () {
    let _this = this
    this.$socket.emit('getBlock', Buffer.from(this.$route.params.hash.substring(2), 'hex'), (data) => {
      if (data) _this.block = new Block(data)
    })
    console.log('Page is fully loaded!!!')
  }
})
</script>

<style scoped="" lang="less">
  @import '~lessPath/Block/Block';

</style>
