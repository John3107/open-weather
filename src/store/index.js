import { createStore } from "vuex";
import { axiosInstance } from "@/utils/axiosInstance";
const API_KEY = "658767b0ae936b022f59a69f44868419";

export default createStore({
  state: {
    autocompliteCitiesList: [],
    citiesList: [],
    currentCity: {},
    savedCitiesList: localStorage.getItem("saved-cities")
      ? JSON.parse(localStorage.getItem("saved-cities"))
      : [],
    savedCitiesData: [],
  },
  getters: {
    autocompliteCitiesList: (state) => {
      return state.autocompliteCitiesList.map((city) => ({
        ...city,
        id: city.lat.toFixed(4) + city.lon.toFixed(4),
      }));
    },
    citiesList: (state) => state.citiesList,
    currentCity: (state) => state.currentCity,
    savedCitiesList: (state) => state.savedCitiesList,
    savedCitiesData: (state) => state.savedCitiesData,
  },
  actions: {
    fetchCitiesList: async ({ commit }, payload) => {
      try {
        const response = await axiosInstance.get(
          `geo/1.0/direct?q=${payload}&limit=5&appid=${API_KEY}`
        );
        commit("setAutocompliteCitiesList", response.data);
      } catch (e) {
        console.error(e);
      }
    },
    fetchCurrentCity: async ({ commit }, payload) => {
      try {
        const response = await axiosInstance.get(
          `data/2.5/onecall?lat=${payload.lat}&lon=${payload.lon}&units=metric&exclude=daily&appid=${API_KEY}`
        );
        commit("setCurrentCity", {
          ...response.data,
          country: payload.country,
          state: payload.state,
          name: payload.name,
          isSaved: payload.isSaved,
          savedPage: payload.savedPage,
        });
        return response.data;
      } catch (e) {
        console.error(e);
      }
    },
  },
  mutations: {
    setAutocompliteCitiesList(state, data) {
      state.autocompliteCitiesList = data;
    },
    setCitiesList(state, data) {
      state.citiesList = data;
    },
    setCurrentCity(state, data) {
      const currentCityData = {
        id: data.lat.toFixed(4) + data.lon.toFixed(4),
        name: data.name,
        state: data.state,
        country: data.country,
        temp: Math.round(data.current.temp),
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon,
        dt: data.current.dt + data.timezone_offset - 10800,
        feelsLike: Math.round(data.current.feels_like),
        windSpeed: data.current.wind_speed,
        windDeg: data.current.wind_deg,
        dewPoint: Math.round(data.current.dew_point),
        pressure: data.current.pressure,
        clouds: data.current.clouds,
        humidity: data.current.humidity,
        sunrise: data.current.sunrise + data.timezone_offset - 10800,
        sunset: data.current.sunset + data.timezone_offset - 10800,
        uvi: data.current.uvi,
        hourly: data.hourly,
        timezoneOffset: data.timezone_offset,
        isSaved: data.isSaved,
      };
      if (!data?.savedPage) {
        state.currentCity = currentCityData;
      } else {
        state.savedCitiesData = [...state.savedCitiesData, currentCityData];
      }
    },
    setSavedCitiesList(state, data) {
      state.savedCitiesList = data;
      localStorage.setItem("saved-cities", JSON.stringify(data));
    },
  },
});
