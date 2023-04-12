<template>
  <div class="current-weather" v-if="currentCity?.id">
    <div class="current-weather__main-data">
      <div class="current-weather__main-data_local">
        <div>
          {{ currentCity.name }},
          <span v-if="currentCity.state">{{ currentCity.state }},</span>
          {{ currentCity.country }}
        </div>
        <span>{{ useFormatDate(currentCity.dt).date }}</span>
        <span class="time">{{ useFormatDate(currentCity.dt).time }}</span>
      </div>
      <div class="current-weather__main-data_info">
        <div class="weather">
          <img
            :src="`https://openweathermap.org/img/wn/${currentCity.icon}@2x.png`"
          />
          {{ currentCity.temp }}C&#176;
        </div>
        {{ currentCity.description }}
      </div>
    </div>
    <div class="current-weather__support-data">
      <div class="current-weather__support-data_col">
        <div>High Feels like: {{ currentCity.feelsLike }}C&#176;</div>
        <div>
          Wind: {{ currentCity.windSpeed }}m/s, {{ currentCity.windDeg }}&#176;
        </div>
        <div>Devpoint: {{ currentCity.dewPoint }}C&#176;</div>
      </div>
      <div class="current-weather__support-data_col">
        <div>Pressure: {{ currentCity.pressure }}mb</div>
        <div>Clouds: {{ currentCity.clouds }}%</div>
        <div>Humidity: {{ currentCity.humidity }}%</div>
      </div>
      <div class="current-weather__support-data_col">
        <div>Sunrise: {{ useFormatDate(currentCity.sunrise).time }}</div>
        <div>Sunset: {{ useFormatDate(currentCity.sunset).time }}</div>
        <div>UV Index: {{ currentCity.uvi }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFormatDate } from "@/views/home-view/section/use/formatDate.js";

export default {
  props: {
    currentCity: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {
      useFormatDate,
    };
  },
};
</script>

<style lang="scss">
.current-weather {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  background-color: #000;
  opacity: 0.6;
  border-radius: 8px;
  padding: 12px;
  box-sizing: border-box;
  &__main-data {
    display: flex;
    justify-content: space-between;
    &_local {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;

      .time {
        font-size: 22px;
      }
    }
    &_info {
      display: inherit;
      flex-direction: column;
      img {
        width: 70px;
        height: 70px;
      }
      .weather {
        display: inherit;
        align-items: center;
        font-size: 28px;
      }
    }
  }
  &__support-data {
    display: flex;
    justify-content: space-between;
    width: 100%;
    &_col {
      display: inherit;
      flex-direction: column;
      gap: 4px;
      width: 33.33%;
    }
  }
}
</style>
