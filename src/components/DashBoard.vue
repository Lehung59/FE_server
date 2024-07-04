<template>
  <div>
    <CRow>
      <CCol :md="6" class="mb-4">
        <label for="month">Tháng:</label>
        <a-input-number class="m-2" id="inputNumber" v-model:value="month" :min="1" :max="12" />  
        <label for="year">Năm:</label>
        <a-input-number  class="m-2" id="inputNumber" v-model:value="year" :min="2000" :max="2024" />
        <a-button type="primary" @click="updateData">Cập nhật</a-button>
      </CCol>
    </CRow>
    <CRow>
      <CCol :sm="12" class="mb-4">
        <CCard>
          <CCardHeader>Thống kê doanh thu hàng ngày trong tháng {{ month }} / {{ year }}</CCardHeader>
          <CCardBody>
            <CChart type="line" :data="chartData" :options="options" ref="mainChartRef"
              style="height: 300px; max-height: 300px; margin-top: 40px" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, nextTick ,watch} from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth.store.js'
import { useRoute } from 'vue-router'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/vue'
import { getStyle } from '@coreui/utils'
import { CChart } from '@coreui/vue-chartjs'

export default defineComponent({
  components: {
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CChart,
  },
  setup() {
    const apiPrefix = import.meta.env.VITE_API_PREFIX
    const authStore = useAuthStore()
    const route = useRoute()
    const token = JSON.parse(localStorage.getItem('token'))
    const mainChartRef = ref()
    const month = ref(new Date().getMonth() + 1)
    const year = ref(new Date().getFullYear())

    const chartData = ref({
      labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
      datasets: [
        {
          label: `Doanh thu trong ngày `,
          backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
          borderColor: getStyle('--cui-info'),
          pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: Array(31).fill(0),
        },
      ],
    })
    const maxx = ref(10);
    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Ngày',
          },
          grid: {
            color: getStyle('--cui-border-color-translucent'),
            drawOnChartArea: false,
          },
          ticks: {
            color: getStyle('--cui-body-color'),
          },
        },
        y: {
          title: {
            display: true,
            text: 'VNĐ',
          },
          beginAtZero: true,
          border: {
            color: getStyle('--cui-border-color-translucent'),
          },
          grid: {
            color: getStyle('--cui-border-color-translucent'),
          },
          max: maxx.value,
          ticks: {
            color: getStyle('--cui-body-color'),
            maxTicksLimit: 5,
            stepSize: Math.ceil(1000000 / 5),
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    }

    const getData = async (month, year) => {
      await axios
        .get(`${apiPrefix}/api/v1/management/order/table2`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { month, year },
        })
        .then((response) => {
          if (response.data && response.data.data && response.data.data.dailyRevenue) {
            const apiData = response.data.data.dailyRevenue
            const newData = Array(31).fill(0)
            
            for (const [day, revenue] of Object.entries(apiData)) {
              const dayIndex = parseInt(day, 10) - 1
              if (dayIndex >= 0 && dayIndex < 31) {
                newData[dayIndex] = revenue
                if(revenue>maxx.value) {
                  maxx.value = revenue+200000;
                  console.log(maxx.value)
                }
              }
            }

            // chartData.value.datasets[0].data = newData
            chartData.value = {
              ...chartData.value,
              datasets: [
                {
                  ...chartData.value.datasets[0],
                  data: newData
                }
              ]
            };
            nextTick(() => {
              if (mainChartRef.value && mainChartRef.value.chart) {

              }
            })
          } else {
            console.error('Invalid data structure:', response.data)
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }

    const updateData = () => {
      getData(month.value, year.value)
    }

    onMounted(() => {
      getData(month.value, year.value)
      mainChartRef.value.chart.update()
    })
    watch(maxx, (newMax) => {
  options.scales.y.max = newMax;
  if (mainChartRef.value && mainChartRef.value.chart) {
    mainChartRef.value.chart.update();
  }
});

    return {
      chartData,
      options,
      month,
      year,
      updateData,
      mainChartRef,
    }
  },
})
</script>

<style scoped>
input {
  margin-right: 10px;
  margin-bottom: 10px;
}

button {
  margin-bottom: 20px;
}
</style>