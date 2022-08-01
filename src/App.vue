<template>

  <div class="min-h-screen min-w-screen overflow-hidden font-mono bg-gradient-to-r from-cyan-600 to-blue-600"
    :class="toggleBackground()">
    
    <SearchInput
      @has-new-query="getNewWeatherQuery"
      @has-new-units="getNewWeatherUnits"
      @need-coords="getNewWeatherCoords"
      />
    
    <div v-if="allWeather !== 'undefined'">

      <DateLocation 
        :name="allWeather.name" 
        :country="allWeather.country" 
        :time="date"
      />
      
      <CurrentWeatherDetails 
        :description="allWeather.description" 
        :temp="Math.floor(allWeather.temp)" 
        :pressure="allWeather.pressure" 
        :humidity="allWeather.humidity"
        :speed="Math.floor(allWeather.speed)" 
        :windSpeedUnits="windSpeedUnits" 
        :feels_like="Math.floor(allWeather.feels_like)" 
        :sunrise="allWeather.sunrise"
        :sunset="allWeather.sunset" 
        :temp_max="Math.floor(allWeather.temp_max)" 
        :temp_min="Math.floor(allWeather.temp_min)"
      />

      <HourAndDateForecast 
        :hourly="allWeather.hourly" 
        :daily="allWeather.daily"
      /> 

    </div>

  </div>

</template>

<script>
import SearchInput from './components/SearchInput.vue';
import DateLocation from './components/DateLocation.vue';
import CurrentWeatherDetails from './components/CurrentWeatherDetails.vue';
import HourAndDateForecast from './components/HourAndDateForecast.vue';
import cleanWeatherData from './components/WeatherFunctions';

export default {
  name: 'App',
  components: {
    SearchInput,
    DateLocation,
    CurrentWeatherDetails,
    HourAndDateForecast,
  },
  data() {
    return {
      allWeather: {},
      windSpeedUnits: 'mph',  // default speed unit
      units: 'imperial',     // default units
      query: 'boston',      // default location
      lat: '',
      lon: '',
      date: '',
      searchParams: {},
    }
  },
  methods: {
    async setWeather() {
      // start loading screen
      this.$isLoading(true);
      // make sure search params are updated
      this.setSearchParams();
      try {
        this.allWeather = await cleanWeatherData(this.searchParams);
        // set appropriate unit for the windspeed
        this.units === 'imperial' ? this.windSpeedUnits = 'mph' : this.windSpeedUnits = 'km/h';
        this.getDate();
      } catch (error) {
        // end loading screen an alert an error happened
        this.$isLoading(false);
        alert("An error occurred!");
      }
      // end loading screen
      this.$isLoading(false)
    },

    async setWeatherWithCoords() {
      // make sure search params are updated with coordinates
      this.$isLoading(true);
      this.searchParams = {lat: this.lat, lon: this.lon, units: this.units}
      try {
        this.allWeather = await cleanWeatherData(this.searchParams);
        // set appropriate unit for the windspeed
        this.units === 'imperial' ? this.windSpeedUnits = 'mph' : this.windSpeedUnits = 'km/h';
        this.getDate();
      } catch (error) {
        // end loading screen an alert an error happened
        this.$isLoading(false);
        alert("An error occurred!");
      }
      // end loading screen
      this.$isLoading(false)
    },

    // fetch fresh data with a new location
    async getNewWeatherQuery(newQuery) {
      if (newQuery) {
        this.query = newQuery;
        await this.setWeather();
      }
    },

    // fetch fresh data with new units
    async getNewWeatherUnits(newUnits) {
      this.units = newUnits;
      Object.keys(this.searchParams).length === 2 ? await this.setWeather() : await this.setWeatherWithCoords();
    },

    getNewWeatherCoords() {
      if (navigator.geolocation) {
        // get the users coordinates and set new weather data with them
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.setWeatherWithCoords()
        });
      }
    },

    // set the location and units
    setSearchParams() {
      // mutate params because they will constantly change
      this.searchParams = {q: this.query, units: this.units};
    },

    // set hot or cold background
    toggleBackground() {
      if (this.allWeather !== 'undefined') {
        if (this.units === 'imperial') {
          // appropriate tailwind class name for backgrounds
          return this.allWeather.temp >= 80 ? "min-h-screen min-w-screen overflow-hidden font-mono bg-gradient-to-r from-orange-600 to-red-600" : "min-h-screen min-w-screen overflow-hidden font-mono bg-gradient-to-r from-cyan-600 to-blue-600"
        } else {
          if (this.units === 'metric') {
            return this.allWeather.temp >= 27 ? "min-h-screen min-w-screen overflow-hidden font-mono bg-gradient-to-r from-orange-600 to-red-600" : "min-h-screen min-w-screen overflow-hidden font-mono bg-gradient-to-r from-cyan-600 to-blue-600"
          }
        }
      }
    },

    getDate() {
      // get the calander date for location
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      this.date = `${day}, ${month} ${date} ${year}`;
    }
  },
  created() {
    // get default data on load
    this.setWeather();
  },
}
</script>
