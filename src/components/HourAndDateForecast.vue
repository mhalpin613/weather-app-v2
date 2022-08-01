<template>

    <div class="flex items-center justify-center md:mt-8 mt-10 2xl:mt-16">
        <p class="font-medium text-white">HOURLY FORECAST</p>
    </div>

    <div class="flex justify-center">
      <hr class="w-3/4 my-2 md:w-11/12">
    </div>

    <div class="flex items-center justify-evenly text-white overflow-x-auto">

      <div class="flex flex-col items-center justify-center mx-6 2xl:mx-12 md:mx-6"
        v-for="hour in hourly" :key="hour">
        <p class="font-light text-sm">{{hour.title}}</p>
        <p class="font-medium my-2">{{Math.floor(hour.temp)}}°</p>
        <p class="font-light text-xs text-cyan-200">{{hour.description}}</p>
      </div>

      
    </div>

    <div class="flex items-center justify-center mt-6 md:mt-8 2xl:mt-12">
        <p class="font-medium text-white">DAILY FORECAST</p>
    </div>

    <div class="flex justify-center">
      <hr class="w-3/4 my-2 md:w-11/12">
    </div>

    <div class="flex items-center justify-evenly overflow-x-auto text-white">
      

      <div class="flex flex-col items-center justify-center mx-8 2xl:mx-16 md:mx-4"
        v-for="day in daily" :key="day">

        <p class="font-light text-sm">{{day.title}}</p>
        <p class="font-medium my-2">{{Math.floor(day.temp)}}°</p>
        <p class="font-light text-xs text-cyan-200">{{day.description}}</p>
      </div>

    </div>

</template>

<script>

export default {
  name: 'HourAndDateForecast',
  props: ['hourly', 'daily']
}

</script>