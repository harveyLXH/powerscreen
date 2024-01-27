<template>
  <div ref="divRef" class="home" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import useEchart from '@/hooks/useEchart'

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  echartDatas: {
    type: Array,
    default: () => {
      return []
    },
  },
})

// 拿到div的dom对象
let divRef = ref(null)
let hyChart = null

// 监听 echartsDatas 的变化
watch(
  () => props.echartDatas,
  (newV, oldV) => {
    setupEchart(newV)
  }
)

onMounted(() => {
  setupEchart(props.echartDatas)
})

function setupEchart(echartDatas = []) {
  if (!hyChart) {
    hyChart = useEchart(divRef.value)
  }
  let option = getOption(echartDatas) // 准备数据
  hyChart.setOption(option)
}

function getOption(echartDatas) {
  let category = echartDatas.map(item => {
    return item.name
  })
  let categoryData = echartDatas.map(item => {
    return item.value
  })
  let option = {
    // backgroundColor: 'rbg(40,46,72)',
    grid: {
      left: '5%',
      right: '5%',
      top: '30%',
      bottom: '5%',
      containLabel: true, // grid 区域是否包含坐标轴的刻度标签
    },
    tooltip: {},
    xAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: '#42A4FF',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: 'white',
      },

      data: category,
    },
    yAxis: {
      name: '个',
      nameTextStyle: {
        color: 'white',
        fontSize: 13,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#42A4FF',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#42A4FF',
        },
      },
      axisLabel: {
        color: 'white',
      },
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        barWidth: 17,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#01B1FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#033BFF', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        data: categoryData,
      },
    ],
  }

  return option
}
</script>

<style scoped></style>
