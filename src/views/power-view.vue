<template>
  <main class="screen-bg">
    <div class="header"></div>

    <div class="left-top">
      <pie-charts :echartDatas="chargingPile"></pie-charts>
    </div>
    <div class="left-bottom">
      <line-charts :echartDatas="precessMonitoring"></line-charts>
    </div>

    <div class="right-top">
      <right-top-panel :panelItems="chargingTop4" :percentage="percentage"></right-top-panel>
    </div>
    <div class="right-center">
      <bar-charts :echartDatas="chargingStatistics"></bar-charts>
    </div>
    <div class="right-bottom">
      <right-bottom-svg :dots="exceptionMonitoring"></right-bottom-svg>
    </div>

    <div class="center">
      <center-svg></center-svg>
    </div>
    <div class="bottom">
      <bottom-panel :panelItems="dataAnalysis"></bottom-panel>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { getPowerScreenData } from '@/services'
import {
  chargingPileData,
  processMonitoringData,
  chargingStatisticsData,
  exceptionMonitoringData,
  dataAnalysisData,
  chargingTop4Data,
} from '@/views/config/home-data'

import mockData from '@/views/config/mock-data'

import PieCharts from '@/components/pie-echarts.vue'
import LineCharts from '@/components/line-echarts.vue'

import RightTopPanel from '@/components/right-top-panel.vue'
import BarCharts from '@/components/bar-echarts.vue'
import RightBottomSvg from '@/components/right-bottom-svg.vue'

import CenterSvg from '@/components/center-svg.vue'
import BottomPanel from '@/components/bottom-panel.vue'

// 充电桩饱和比例
let chargingPile = ref(chargingPileData)
// 流程监控
let precessMonitoring = ref(processMonitoringData)
// 充电桩数据分析
let chargingStatistics = ref(chargingStatisticsData)
// 异常监控
let exceptionMonitoring = ref(exceptionMonitoringData)
// 充电桩数据分析
let dataAnalysis = ref(dataAnalysisData)
// 充电桩Top
let chargingTop4 = ref(chargingTop4Data)
let percentage = ref(0)

if (import.meta.env.MODE === 'development') {
  // 发起网络请求获取首页数据
  getPowerScreenData().then(res => {
    // console.log(res.data)
    chargingPile.value = res.data.chargingPile.data
    precessMonitoring.value = res.data.processMonitoring.data
    chargingStatistics.value = res.data.chargingStatistics.data
    exceptionMonitoring.value = res.data.exceptionMonitoring.data
    dataAnalysis.value = res.data.dataAnalysis.data

    chargingTop4.value = res.data.chargingTop4.data
    percentage.value = res.data.chargingTop4.totalPercentage
  })
} else {
  // 生产环境使用测试数据
  setTimeout(() => {
    chargingPile.value = mockData.chargingPile.data
    precessMonitoring.value = mockData.processMonitoring.data
    chargingStatistics.value = mockData.chargingStatistics.data
    exceptionMonitoring.value = mockData.exceptionMonitoring.data
    dataAnalysis.value = mockData.dataAnalysis.data

    chargingTop4.value = mockData.chargingTop4.data
    percentage.value = mockData.chargingTop4.totalPercentage
  }, 100)
}
</script>

<style scoped>
.screen-bg {
  /* 定位 */
  position: absolute;
  width: 100%;
  height: 100%;

  /* 背景 */
  background-color: #070a3c;
  background-image: url(@/assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.header {
  /* 定位 */
  position: absolute;
  top: 21px;
  left: 0;
  right: 0;
  height: 56px;

  /* 背景 */
  background-image: url(@/assets/images/bg_header.svg);
  background-repeat: no-repeat;
}

.left-top {
  /* 定位 */
  position: absolute;
  top: 116px;
  left: 16px;
  width: 536px;
  height: 443px;
  /* 背景 */
  background-image: url(@/assets/images/bg_left-top.svg);
  background-repeat: no-repeat;
}

.left-bottom {
  /* 定位 */
  position: absolute;
  bottom: 49px;
  left: 16px;
  width: 536px;
  height: 443px;
  /* 背景 */
  background-image: url(@/assets/images/bg_left_bottom.svg);
  background-repeat: no-repeat;
}

.right-top {
  position: absolute;
  right: 17px;
  top: 96px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_top.svg);
  background-repeat: no-repeat;
}
.right-center {
  position: absolute;
  right: 17px;
  top: 443px;
  width: 519px;
  height: 327px;

  background-image: url(../assets/images/bg_right_center.svg);
  background-repeat: no-repeat;
}
.right-bottom {
  position: absolute;
  right: 17px;
  bottom: 49px;
  width: 519px;
  height: 242px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(../assets/images/bg_right_bottom.svg);
  background-repeat: no-repeat;
}

.center {
  position: absolute;
  right: 540px;
  bottom: 272px;
  width: 823px;
  height: 710px;
}

.bottom {
  position: absolute;
  right: 540px;
  bottom: 49px;
  width: 823px;
  height: 209px;

  background-image: url(../assets/images/bg_bottom.svg);
  background-repeat: no-repeat;
}
</style>
