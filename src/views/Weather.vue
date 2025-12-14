<template>
    <div id="weather_container">
  <div id="weather">
      <div id="title_bar">
          <div id="title">天气预报</div>
          <div id="theme"></div>
      </div>

      <input id="city_search_input" type="search" placeholder="查找你的城市" v-model="targetCity" @keydown.enter="searchWeather">

      <div id="location_catch">定位当前城市</div>
      <div id="search_history">
          <div id="search_history_title">最近的搜索记录</div>
          <div id="search_history_container">
              <div class="search_history_item" v-for="item in searchHistory" :key="item" @click="chooseHistory(item)">{{item}}</div>
          </div>
      </div>
      <div id="loading" v-if="!cityWeather" style="height: 80px;">

      </div>
      <div id="city_weather" v-if="cityWeather">
          <div id="city_info">
              <div id="city_name">{{cityWeather?.name}},{{cityWeather?.sys?.country}}</div>
              <div id="city_time">{{currentTime}}</div>
          </div>
          <div id="main_weather">
              <div id="main_temperature">{{cityWeather?.main?.temp}}℃</div>
              <div id="main_sky">{{cityWeather?.weather?.[0]?.description}}</div>
              <div id="feel_temperature">Feels like:{{cityWeather?.main?.feels_like}}℃</div>
          </div>
          <div id="other_weather">
              <div class="other_weather_item">
                  <div class="other_weather_logo">
                      <svg t="1763610108910" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5079" width="32" height="32"><path d="M96 448h423.36c296.96 0 245.76-410.56-17.6-410.56-93.44 0-192 64-199.36 153.92-8.32 96 86.08 139.84 128 85.44a48 48 0 0 0-32-76.8c0-23.36 45.44-66.88 103.68-66.88 139.2 0 184.96 218.56 17.6 218.56H96A48 48 0 0 0 96 448z m338.88 96H96a48 48 0 0 0 0 96h320a124.8 124.8 0 0 1 123.84 124.8c0 148.8-204.48 151.04-221.12 69.12 50.88 55.36 126.08-36.16 55.36-93.12-92.8-74.56-217.92 77.44-111.68 181.76a220.16 220.16 0 0 0 374.4-157.76 224 224 0 0 0-201.92-220.8zM800 480h-128a48 48 0 0 0 0 96h136.64a85.44 85.44 0 0 1 62.08 142.72c-13.44-82.88-149.76-61.12-135.68 37.76a101.44 101.44 0 0 0 144 71.04A181.12 181.12 0 0 0 800 480z" fill="#e6e6e6" p-id="5080"></path></svg>
                  </div>
                  <div class="other_weather_title">wind</div>
                  <div class="other_weather_data">{{cityWeather?.wind?.speed}}m/s</div>
              </div>
              <div class="other_weather_item">
                  <div class="other_weather_logo">
                      <svg t="1763610193644" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6542" width="32" height="32"><path d="M506.592 160a30.4 30.4 0 0 1 22.944 10.4c25.6 29.44 250.112 291.456 250.112 428.48 0 146.176-122.048 265.12-272 265.12-149.984 0-272-118.944-272-265.12 0-136.96 222.528-399.008 247.904-428.416A30.464 30.464 0 0 1 506.528 160h0.064z m1.056 645.344c116.768 0 211.808-92.64 211.808-206.464 0-88-137.28-272.064-212.8-363.328-74.88 91.328-210.816 275.392-210.816 363.328 0 113.824 95.008 206.464 211.808 206.464z m-111.616-306.464c22.4 5.12 52.8 21.472 88.64 38.272 38.304 17.92 53.856 25.216 107.648 16.8 15.552-2.4 29.248-8.256 40.864-14.176 11.424-5.792 25.728-1.344 30.624 9.92 8.864 20.32 14.24 39.072 14.24 54.72 0 88.16-76.288 159.648-170.4 159.648-94.112 0-170.432-71.488-170.432-159.68 0-25.632 14.4-59.776 34.72-95.36a22.112 22.112 0 0 1 24.096-10.176z" fill="#e6e6e6" p-id="6543"></path></svg>
                  </div>
                  <div class="other_weather_title">humidity</div>
                  <div class="other_weather_data">{{cityWeather?.main?.humidity}}%</div>
              </div>
              <div class="other_weather_item">
                  <div class="other_weather_logo">
                      <svg t="1763610265753" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7696" width="32" height="32"><path d="M618.667 456.533V145.067C618.667 64 548.267 0 469.333 0S320 64 320 145.067v260.266c0 17.067 14.933 32 32 32s32-14.933 32-32V145.067C384 100.267 424.533 64 469.333 64s85.334 36.267 85.334 81.067v330.666c0 12.8 4.266 23.467 14.933 27.734 76.8 38.4 123.733 117.333 123.733 204.8 2.134 128-100.266 230.4-224 230.4s-224-102.4-224-228.267c0-74.667 36.267-142.933 93.867-185.6 14.933-10.667 17.067-29.867 6.4-44.8s-29.867-17.067-44.8-6.4c-74.667 55.467-119.467 142.933-119.467 238.933 0 162.134 128 292.267 288 292.267s290.134-130.133 290.134-292.267c0-108.8-55.467-204.8-140.8-256zM704 170.667h104.533c17.067 0 32-14.934 32-32s-12.8-32-32-32H704c-17.067 0-32 14.933-32 32s14.933 32 32 32z m104.533 64H704c-17.067 0-32 14.933-32 32s14.933 32 32 32h104.533c17.067 0 32-14.934 32-32s-12.8-32-32-32z" p-id="7697" fill="#e6e6e6"></path><path d="M808.533 362.667H704c-17.067 0-32 14.933-32 32s14.933 32 32 32h104.533c17.067 0 32-14.934 32-32s-12.8-32-32-32z" p-id="7698" fill="#e6e6e6"></path></svg>
                  </div>
                  <div class="other_weather_title">pressure</div>
                  <div class="other_weather_data">{{cityWeather?.main?.pressure}}hPa</div>
              </div>
              <div class="other_weather_item">
                  <div class="other_weather_logo">
                      <svg t="1763610352981" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9258" width="32" height="32"><path d="M512 192C298.666667 192 115.2 324.266667 42.666667 512c72.533333 187.733333 256 320 469.333333 320 213.333333 0 396.8-132.266667 469.333333-320C908.8 324.266667 725.333333 192 512 192zM512 725.333333c-119.466667 0-213.333333-93.866667-213.333333-213.333333s93.866667-213.333333 213.333333-213.333333c119.466667 0 213.333333 93.866667 213.333333 213.333333S631.466667 725.333333 512 725.333333zM512 384c-72.533333 0-128 55.466667-128 128s55.466667 128 128 128c72.533333 0 128-55.466667 128-128S584.533333 384 512 384z" p-id="9259" fill="#e6e6e6"></path></svg>
                  </div>
                  <div class="other_weather_title">visibility</div>
                  <div class="other_weather_data">{{cityWeather?.visibility/1000}}km</div>
              </div>
          </div>
      </div>
      <div id="city_forecast">
          <div id="forecast_title"></div>
          <div id="forecast_info">
              <div class="day_info"></div>
          </div>
      </div>
  </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

const targetCity = ref(null);
const currentTime = ref(new Date().toLocaleDateString());
const searchHistory = ref(["shanghai","beijing"]);
const cityWeather = ref(null);
const cityForecast = ref(null);



const searchWeather = function (){
    axios({
        url:"https://api.openweathermap.org/data/2.5/weather",
        method:'get',
        params:{
            q:targetCity.value,
            appid:"04e6eadefb196fce9bf51eb29f053749",
            units:"metric"
        }
    }).then(response => {
        cityWeather.value = response.data;
    })
}

const chooseHistory = function (history){
    targetCity.value = history;
    searchWeather();
}

</script>

<style scoped>
#weather_container{
    width: 100%;
    height: 100%;
    padding: 20px;
    background: #efefef;
    overflow: scroll;
    overflow-x: hidden;
}

#weather{
    width: 94%;
    height: auto;
    margin: 0 auto;
    border-radius: 10px;
    background-color: white;
}

#title_bar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 90px;
    border-radius: 10px 10px 0 0;
    padding: 20px;
    background-color: hsla(220,80%,50%,0.7);
}

#title{
    color: white;
    font-size: 26px;
}


#city_search_input{
    outline: 0;

    display: block;
    width: 90%;
    height: 40px;
    margin: 10px auto;
    padding: 2px 14px;
    border-radius: 20px;
    border: solid 1px #dddddd;
    font-size: 22px;
    background-color: #f9f9f9;
    caret-color: aqua;
}

#city_search_input:focus{
    border: solid 3px hsla(260,80%,50%,0.5);
}

#location_catch{
    width: 90%;
    height: 40px;
    margin: 0 auto;
    border-radius: 20px;
    vertical-align: center;
    text-align: center;
    line-height: 40px;
    color: #555555;
    background-color: #f6f6f6;
    cursor: pointer;
}

#location_catch:hover{
    background-color: #ccccff;
}

#search_history{
}

#search_history_title{
    margin: 5px 20px;
    color: #999999;
    font-size: 14px;
}

#search_history_container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
}

.search_history_item{
    height: 30px;
    margin: 2px 4px;
    border: solid 1px #cccccc;
    border-radius: 15px;
    padding: 2px 8px;
    background-color: #f6f6f6;
    cursor: pointer;
}

.search_history_item:hover{
    background-color: #ccccff;
}

#city_weather{
    width: 90%;
    height: auto;
    margin: 5px auto;
    border-radius: 12px;
    color: white;
    background: linear-gradient(135deg,hsla(30,100%,50%,0.9),hsla(10,100%,50%,0.8));
}

#city_info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
    padding: 5px 20px;
}

#city_name{
    font-size: 32px;
}

#main_weather{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    height: auto;
    padding: 4px 20px;
}

#main_temperature{
    font-size: 36px;
}

#main_sky{
    font-weight: bold;
    font-size: 18px;
}

#other_weather{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: auto;
    padding: 5px 20px;
}

.other_weather_item{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    width: 120px;
    height: 80px;
    padding: 10px;
}

.other_weather_title{
    font-size: 16px;
    color: #e6e6e6;
}

.other_weather_logo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    scale: 1.2;
}

</style>
