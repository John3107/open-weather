<template>
  <div class="cities-list">
    <button class="cities-list__city add saved" @click="changePage">
      Saved
    </button>
    <button
      class="cities-list__city add"
      v-if="citiesList.length < 5"
      @click="onFocus"
    >
      +
    </button>
    <TransitionGroup name="fade">
      <div
        class="cities-list__city"
        v-for="city in citiesList"
        :class="{ 'cities-list__city_current': city.id === currentCity.id }"
        :key="city.id"
        @click="selectCity(city)"
      >
        {{ city.name }}, <span v-if="city.state">{{ city.state }},</span>
        {{ city.country }}
        <div class="cities-list__city_buttons">
          <button
            @click="onSaved(city)"
            :class="{ 'saved-active': city.isSaved }"
          >
            Saved
          </button>
          <button @click="confirmRemove(city.id)">Delete</button>
        </div>
      </div>
      <modal-base
        v-if="modalData.isShow"
        @close-modal="modalData.isShow = false"
      >
        <h3>{{ modalData.text }}</h3>
        <div class="buttons">
          <button @click="modalData.isShow = false">Cancel</button>
          <button @click="removeCity">Ok</button>
        </div>
      </modal-base>
    </TransitionGroup>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const modalData = reactive({
      isShow: false,
      type: "",
      text: "",
    });
    let cityToRemoveID = ref("");

    const { getters, commit, dispatch, state } = useStore();
    const router = useRouter();

    const citiesList = computed(() => getters.citiesList);
    const currentCity = computed(() => getters.currentCity);
    const savedCitiesList = computed(() => getters.savedCitiesList);

    const confirmRemove = (cityId) => {
      modalData.isShow = true;
      modalData.type = "card";
      modalData.text = "Are you sure you want to delete the city?";
      cityToRemoveID.value = cityId;
    };

    const removeCity = () => {
      if (modalData.type === "card") {
        const citiesWithoutDeleted = citiesList.value.filter(
          (city) => city.id !== cityToRemoveID.value
        );

        if (!citiesWithoutDeleted.length) {
          state.currentCity = {};
        }
        commit("setCitiesList", citiesWithoutDeleted);
      }
      if (modalData.type === "saved") {
        const savedCities = savedCitiesList.value.slice(1,5);
        commit("setSavedCitiesList", savedCities);
      }
      modalData.isShow = false;
    };

    const selectCity = (city) => {
      dispatch("fetchCurrentCity", city);
    };

    const onFocus = () => {
      const input = document.getElementById("autocomplite-input");
      input.focus();
    };

    const onSaved = (city) => {
      const savedCity = citiesList.value.map((c) =>
        c.id === city.id && savedCitiesList.value.length <= 4
          ? { ...c, isSaved: !city.isSaved }
          : c
      );
      commit("setCitiesList", savedCity);

      let savedCities = [];

      if (!city.isSaved && savedCitiesList.value.length <= 5) {
        savedCities = [...savedCitiesList.value, { ...city, isSaved: true }];
      }
      if (city.isSaved) {
        savedCities = savedCitiesList.value.filter((c) => c.id !== city.id);
        commit("setSavedCitiesList", savedCities);
      }
      if (savedCitiesList.value.length === 5) {
        modalData.isShow = true;
        modalData.type = "saved";
        modalData.text = "Delete the city, 5 is a max.";
        return;
      }

      commit("setSavedCitiesList", savedCities);
    };

    const changePage = async () => {
      state.savedCitiesData = [];
      const promises = [];
      savedCitiesList.value.forEach((el) => {
        promises.push(dispatch("fetchCurrentCity", { ...el, savedPage: true }));
      });
      await Promise.all(promises).then(() => {
        router.push("saved");
      });
    };

    onMounted(() => {
      const dataFromLS = JSON.parse(localStorage.getItem("saved-cities"));
      const findCity = dataFromLS?.find((city) => city.id === "50.450030.5241");
      dispatch("fetchCurrentCity", {
        name: "Kyiv",
        state: "",
        country: "UA",
        lat: 50.45,
        lon: 30.5241,
      }).then(() => {
        commit("setCitiesList", [
          {
            id: "50.450030.5241",
            name: "Kyiv",
            state: "",
            country: "UA",
            lat: 50.45,
            lon: 30.5241,
            isSaved: findCity ? findCity.isSaved : false,
          },
        ]);
      });
    });

    return {
      citiesList,
      removeCity,
      currentCity,
      selectCity,
      onFocus,
      modalData,
      confirmRemove,
      onSaved,
      changePage,
    };
  },
};
</script>

<style scoped lang="scss">
.cities-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 300px;
  &__city {
    display: inherit;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 260px;
    justify-content: space-around;
    background-color: #000;
    opacity: 0.6;
    border-radius: 12px;
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
    gap: 6px;
    &:hover {
      opacity: 0.8;
    }
    &_buttons {
      display: inherit;
      button {
        width: 53px;
        background-color: inherit;
        border: 1px solid #fff;
        border-radius: 6px;
        color: #fff;
        cursor: pointer;
        margin: 0 12px;
        &:last-child {
          &:hover {
            background-color: #fff;
            color: #000;
          }
        }
      }

      .saved-active {
        background-color: #fff;
        color: #000;
      }
    }
    &_current {
      width: 300px;
    }
  }
  .add {
    justify-content: center;
    font-size: 85px;
    border: none;
    color: #fff;
    cursor: pointer;
  }
  .saved {
    font-size: 24px;
  }
  .modal-base {
    h3 {
      color: #000;
    }
    .buttons {
      display: flex;
      gap: 8px;
      button {
        width: 55px;
        border: 1px solid #000;
        margin: 4px;
        border-radius: 8px;
        background-color: #fff;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #000;
        }
      }
    }
  }
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
