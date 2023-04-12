<template>
  <div class="weather-chart">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { useStore } from "vuex";
import { computed, onMounted, watch } from "vue";
import { useFormatDate } from "@/views/home-view/section/use/formatDate.js";
import { useChartData } from "./useChartData.js";

export default {
  setup() {
    const { getters } = useStore();
    const currentCity = computed(() => getters.currentCity);
    let myChart = "";

    const data = {
      labels: useChartData(useFormatDate, currentCity.value).hours,
      datasets: [
        {
          label: "Temperature C°",
          backgroundColor: "#FFF",
          data: useChartData(useFormatDate, currentCity.value).degrees,
        },
      ],
    };

    const config = {
      type: "bar",
      data,
    };

    watch(currentCity, (currentValue) => {
      myChart.data.datasets[0].data = useChartData(useFormatDate, currentValue).degrees;
      myChart.data.labels = useChartData(useFormatDate, currentValue).hours;
      myChart.update();
    });

    onMounted(() => {
      myChart = new Chart(document.getElementById("myChart"), config);
    });
  },
};
</script>

<style lang="scss">
.weather-chart {
  background-color: #000;
  border-radius: 8px;
  opacity: 0.6;
}
</style>
