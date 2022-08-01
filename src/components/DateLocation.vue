<template>

    <div class="flex justify-center mt-8 md:mt-10 2xl:mt-12">
        <p class="text-white font-extralight text-xl">
            {{time}}
        </p>
    </div>
    <div class="flex justify-center 2xl:mt-10 md:mt-8 mt-6 mb-6">
        <p class="text-white font-medium text-3xl">
            {{name + ","}} {{country}}
        </p>
    </div>

</template>

<script>

export default {
  name: 'DateLocation',
  props: ['name', 'country', 'time']
}

</script>