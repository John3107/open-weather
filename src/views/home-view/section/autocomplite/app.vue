<template>
  <div class="autocomplite">
    <input
      v-model.trim="inputValue"
      placeholder="Search city..."
      id="autocomplite-input"
      :disabled="citiesList.length === 5"
    />
    <TransitionGroup name="fade-down">
      <div
        v-for="city in autocompliteCitiesList"
        :key="city.id"
        class="autocomplite__city-list"
      >
        <div class="autocomplite__city-list_item" @click="selectCity(city)">
          {{ city.name }}, <span v-if="city.state">{{ city.state }},</span>
          {{ city.country }}
        </div>
      </div>
    </TransitionGroup>
    <TransitionGroup name="fade">
      <modal-base v-if="isShowModal" @close-modal="isShowModal = false">
        <h3>This city have already added to the list of cities.</h3>
      </modal-base>
    </TransitionGroup>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watch, computed } from "vue";

export default {
  setup() {
    let inputValue = ref("");
    let isShowModal = ref(false);

    const { dispatch, getters, commit } = useStore();

    const autocompliteCitiesList = computed(
      () => getters.autocompliteCitiesList
    );
    const citiesList = computed(() => getters.citiesList);
    const savedCitiesList = computed(() => getters.savedCitiesList);

    watch(inputValue, (currentValue) => {
      if (currentValue) {
        dispatch("fetchCitiesList", currentValue);
      } else {
        commit("setAutocompliteCitiesList", []);
      }
    });

    const selectCity = (city) => {
      commit("setAutocompliteCitiesList", []);
      inputValue.value = "";

      const searchOriginalCity = citiesList.value.find((c) => c.id === city.id);
      if (searchOriginalCity) {
        isShowModal.value = true;
        return;
      }

      let citiesListUpdated = [];
      if (citiesList.value.length <= 4) {
        dispatch("fetchCurrentCity", city);
        const findCity = savedCitiesList.value.find(c => c.id === city.id) 
        citiesListUpdated = [{ ...city, isSaved: !!findCity }, ...citiesList.value];
        commit("setAutocompliteCitiesList", []);
      } 

      commit("setCitiesList", citiesListUpdated);
    };

    return {
      inputValue,
      autocompliteCitiesList,
      selectCity,
      isShowModal,
      citiesList
    };
  },
};
</script>

<style scoped lang="scss">
.autocomplite {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  height: 212px;
  input {
    width: 100%;
    height: 40px;
    padding: 6px 12px;
    border-radius: 24px;
    border: none;
    outline: none;
    font-size: 18px;
    margin-bottom: 4px;
    box-sizing: border-box;
  }
  &__city-list {
    margin-top: 2px;
    border-radius: 12px;
    width: 100%;
    color: #000;
    background-color: #fff;
    &_item {
      cursor: pointer;
      padding: 6px;
      &:hover {
        border-radius: 12px;
        background-color: #e2e2e2;
      }
    }
  }
  .modal-base {
    h3 {
      color: #000;
    }
  }
}

.fade-down-enter-active {
  transition: all 0.3s ease-in-out;
}

.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
