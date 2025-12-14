<template>
  <div id="menu_control">
      <div v-for="route in routeList" :class="{'route':true,'active_route':activeRoute===route.name}" @click="activeRoute = route.name">
          <router-link :to="route.path" style="all: unset">{{route.name}}</router-link>
      </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {routes} from "@/router/index.js";

const routeList = ref(routes);

const activeRoute = ref(null);



</script>

<style scoped>
#menu_control{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    flex-shrink: 0;
    width: 120px;
    height: 100%;
    background: hsla(240,80%,50%,0.7);
    overflow-y: scroll;
    scrollbar-width: none;
}


.route{
    width: auto;
    height: auto;
    margin: 5px;
    padding: 2px 10px;
    border-radius: 4px;
    font-size: clamp(16px,2vw,20px);
    font-weight: bolder;
    color: hsla(60,100%,50%,0.8);
    background: rgba(240,240,240,0.6);
    cursor: pointer;
}

.active_route{
    scale: 1.1;
    color: hsla(180,100%,50%,0.7);
    background: rgba(250,250,250,0.4);
    box-shadow: 2px 2px 2px slategray;
}

</style>
