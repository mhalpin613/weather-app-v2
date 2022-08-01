<template>

  <div class="flex justify-center">

    <div class="w-5/12 md:w-3/4 mt-8 md:mt-8 2xl:mt-12 flex justify-center">

      <input type="text" 
      placeholder="search city..."
      class=" w-7/12 max-w-xl h-16 bg-slate-200 opacity-60 text-xl font-light rounded-md p-2 shadow-lg focus: outline-none capitalize placeholder:lowercase transform transition duration-400 hover:opacity-100"
      v-model="newQuery"
      @keyup.enter="$emit('hasNewQuery', newQuery)"
      />

      <button class="h-8 w-8 mt-3.5 ml-6 transform transition duration-200 hover:scale-125"
        @click="$emit('hasNewQuery', newQuery)">
        <img src="../assets/icons/search.svg" alt="search">
      </button>
      <button class="h-8 w-8 mt-3.5 ml-5 transform transition duration-200 hover:scale-125"
        @click="$emit('needCoords')">
        <img src="../assets/icons/map-marker.svg" alt="location">
      </button>

      <button name="imperial" class="h-8 w-8 mt-3.5 ml-16 text-xl font-light text-white transform transition duration-200 hover:scale-125"
        @click="$emit('hasNewUnits', 'imperial')">
        F°
      </button>
      <p class="h-8 w-8 mt-3.5 text-xl font-light text-white text-center">|</p>
      <button name="metric" class="h-8 w-8 ml-2 mt-3.5 text-xl font-light text-white transform transition duration-200 hover:scale-125"
        @click="$emit('hasNewUnits', 'metric')">
        C°
      </button>

    </div>

  </div>

</template>

<script>

export default {
  name: 'SearchInput',
  data() {
    return {
      newQuery: '',
    }
  },
}

</script>


