<script setup>
const props = defineProps({
  size:{
    type: String,
    default: "medium",
    validator: value => {["small","medium","large","huge"].includes(value)}
  },
  color:{
    type: String
  }
})
</script>

<template>
  <div id="block"  :style="{backgroundColor:color}"  :class="[`size-${size}_block`]">
    <slot></slot>
  </div>
</template>

<style scoped>
#block{
  position: relative;
  aspect-ratio: 1;
  margin: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.size-small_block{
  width: 60px;
  height: 60px;
}

.size-medium_block{
  width: 100px;
  height: 100px;
}

.size-large_block{
  width: 120px;
  height: 120px;
}


</style>