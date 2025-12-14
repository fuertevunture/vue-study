<script setup>
import MenuControl from "@/components/MenuControl.vue";

</script>

<template>
  <div id="app">
      <header id="top_control">

      </header>
      <div id="content_main">
          <main>
              <MenuControl></MenuControl>
              <div id="router_container">
                  <router-view></router-view>
              </div>
          </main>
      </div>
  </div>

</template>

<style scoped>
#app{
    --topHeight:120px;
}

#top_control{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: var(--topHeight);
    background: hsla(180,80%,50%,0.8);
}

main{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 100%;
    height: calc(100vh - var(--topHeight));

}

#router_container{
    flex: 1 1 100%;
    height: 100%;
    background: #fefefe;
}


</style>
