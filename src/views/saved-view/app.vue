<template>
  <div class="saved-view">
    <current-weather
      v-for="city in savedCitiesData"
      :key="city.id"
      :currentCity="city"
    />
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CurrentWeather from "@/views/components/current-weather/app.vue";

export default {
  components: {
    CurrentWeather,
  },
  setup() {
    const router = useRouter();
    const { getters } = useStore();
    const savedCitiesData = computed(() => getters.savedCitiesData);

    onMounted(() => {
      if (!savedCitiesData.value.length) {
        router.push("home");
      }
    });

    return {
      savedCitiesData,
    };
  },
};
</script>

<style scoped lang="scss">
.saved-view {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 24px;
  max-width: 800px;
}
</style>
