<template>
  <div class="home-view">
    <cities-list />
    <div class="home-view__main">
      <autocomplite />
      <current-weather :currentCity="currentCity" />
      <weather-chart v-if="currentCity?.id" />
    </div>
  </div>
</template>

<script>
import Autocomplite from "./section/autocomplite/app.vue";
import CitiesList from "./section/cities-list/app.vue";
import CurrentWeather from "@/views/components/current-weather/app.vue";
import WeatherChart from "./section/weather-chart/app.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: {
    Autocomplite,
    CitiesList,
    CurrentWeather,
    WeatherChart,
  },
  setup() {
    const { getters } = useStore();
    const currentCity = computed(() => getters.currentCity);

    return {
      currentCity,
    };
  },
};
</script>

<style scoped lang="scss">
.home-view {
  display: flex;
  gap: 24px;
  @media(max-width: 900px){
    flex-direction: column;
    align-items: center;

  }
  &__main {
    display: inherit;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    gap: 12px;
  }
}
</style>
