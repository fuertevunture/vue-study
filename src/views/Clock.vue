<template>
  <div id="clock">
      <header id="clock_title_bar">
          <div id="clock_title">多时钟</div>
          <div id="clock_mode"></div>
      </header>
      <div id="clock_classify_bar">
          <div :class="{'clockClassify':true,'checkedClockClassify':checkedClockClassify===item}" v-for="item in clockClassifyList" @click="checkedClockClassify = item">
              {{item}}
          </div>
      </div>
      <main id="clock_container"></main>
  </div>
</template>

<script setup>
import {ref} from "vue";

const clockClassifyList = ref(['Analog','Digital','Stopwatch','Timer']);
const checkedClockClassify = ref('Analog');
</script>

<style scoped>
#clock{
    height: 100%;
    overflow: scroll;
    scrollbar-width: none;
}

#clock_title_bar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    height: 80px;
    border-bottom: solid 1px #dddddd;
}

#clock_title{
    font-size: 32px;
    font-weight: bold;
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(120deg,hsla(240,80%,50%,0.7),hsla(280,80%,50%,0.7));
}


#clock_classify_bar{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 12px 4px;
}

.clockClassify{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    width: clamp(100px,12%,200px);
    padding: 6px 10px;
    border: 1px solid #ededed;
    border-radius: 8px;
    cursor: pointer;
    transition: all ease-in 0.3s;
}

.checkedClockClassify{
    position: relative;
    color: hsla(250,80%,50%,0.9);
    border: 1px solid hsla(250,80%,50%,0.4);
    background: hsla(250,80%,50%,0.2);
}

.checkedClockClassify::after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 30%;
    height: 3px;
    transform: translateX(-50%);
    background: hsla(250,80%,50%,0.9);
    border-radius: 1px;
}

.clockClassify:hover{
    color: hsla(250,80%,50%,0.9);
    border: 1px solid hsla(250,80%,50%,0.4);
    background: hsla(250,60%,40%,0.1);
    transform: translateY(-3px);
}

</style>
