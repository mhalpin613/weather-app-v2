<template>

    <div class="flex justify-center 2xl:mb-16 mb-12 mt-10">
        <p class="text-2xl text-cyan-200 font-bold">{{description}}</p>
    </div>

    <div class="flex items-center justify-evenly text-white">

        <div class="flex flex-col space-y-1">

            <div class="flex items-center justify-center text-sm font-light">
                <img src="../assets/icons/balance-scale.svg" alt="" class="w-5 mr-1"> <p class="font-medium">Pressure: {{pressure}} hPa</p>
            </div>

            <div class="flex items-center justify-center text-sm font-light">
                <img src="../assets/icons/raindrops.svg" alt="" class="w-5 mr-1"> <p class="font-medium">Humidity: {{humidity}}%</p>
            </div>

        </div>

        <p class="text-5xl">{{temp}}°</p>

        <div class="flex flex-col space-y-1">

            <div class="flex items-center justify-center text-sm font-light">
                <img src="../assets/icons/wind.svg" alt="" class="w-5 mr-1"> <p class="font-medium">Wind: {{speed}} {{windSpeedUnits}}</p>
            </div>

            <div class="flex items-center justify-center text-sm font-light">
                <img src="../assets/icons/temperature-half.svg" alt="" class="w-5 mr-1"> <p class="font-medium">Feels like: {{feels_like}}°</p>
            </div>

        </div>

    </div>

    <div class="mt-12 2xl:mt-16 md:mt-10 flex items-center justify-center overflow-x-auto space-x-2 text-white text-sm">

        <img src="../assets/icons/arrow-up.svg" alt="" class="w-6">
        <p class="font-light">High: </p>
        <p class="font-medium">{{temp_max}}°</p>
        <p class="font-light">|</p>

        <img src="../assets/icons/arrow-down.svg" alt="" class="w-6">
        <p class="font-light">Low: </p>
        <p class="font-medium">{{temp_min}}°</p>

    </div>

</template>

<script>

export default {
  name: 'CurrentWeatherDetails',
  props: ['description', 'icon', 'temp', 'pressure', 'humidity', 'windSpeedUnits',
          'speed', 'feels_like', 'temp_max', 'temp_min']
}

</script>