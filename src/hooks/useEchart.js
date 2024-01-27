import * as echarts from 'echarts'
import { onUnmounted } from 'vue'

export default function useEchart(divEl) {
  const echartInstance = echarts.init(divEl, null, { renderer: 'svg' })

  onUnmounted(() => {
    echartInstance.dispose() // 销毁实例
  })

  const setOption = option => {
    echartInstance.setOption(option)
  }

  const resizeEchart = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOption,
    resizeEchart,
  }
}
