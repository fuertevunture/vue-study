<template>
  <div :class="['button',`button_style_${buttonStyle}`]">
      <div class="text">{{text}}</div>
  </div>
</template>

<script setup>
const props = defineProps({
    text:{
        type:String,
        default:"button"
    },
    buttonStyle:{
        type:String,
        default:"normal",
        validator: value => ["normal","pixel"].includes(value)
    }
})
</script>

<style scoped>
.button{
    display: inline-block;
    margin: 10px;
    width: 80px;
    height: 32px;
    background: #cccccc;
    cursor: pointer;
}

.button_style_pixel{
    position: relative;
    padding: 6px 12px;
    background-color: #4a4a8a;
    outline: none;
    border: none;
    box-shadow: inset -4px -4px #2a2a5a,
                inset 4px 4px #7a7aba;
    image-rendering: pixelated;
}

.button_style_pixel::before,
.button_style_pixel::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: content-box;
}

.button_style_pixel::before{
    top: -4px;
    left: 0;
    border-top: 4px solid #bfbfff;
    border-bottom: 4px solid #7a7aba;
}

.button_style_pixel::after{
    top: 0;
    left: -4px;
    border-left: 4px solid #bfbfef;
    border-right: 4px solid #7a7aba;
}

.button_style_pixel:hover{
    transform: translateY(-2px);
    box-shadow: inset -4px -2px 0 0 #2a2a5a,
                inset 4px 2px 0 0 #7a7aba;
    background-color: #3a3a7a;
}

</style>
