<template>
    <div :class="[
        'card',
        `card_width_${width}`
    ]">
        <div class="card_title" v-if="title!=='none'">
            <div class="card_title_name">
                {{title}}
            </div>
        </div>
        <div class="card_container" v-show="isSpread">
            <slot></slot>
        </div>
        <div class="card_action">
            <div class="action_button" v-show="!isSpread" @click="isSpread=true">展开</div>
            <div class="action_button" v-show="isSpread" @click="isSpread=false">折叠</div>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";

const isSpread = ref(false);


const props = defineProps({
    title:{
        type:String,
        default:"none"
    },
    width:{
        type:String,
        default:"large",
        validator: value => ["small","normal","large"].includes(value)
    }
})


</script>

<style scoped>
.card{
    height: auto;
    margin: 12px auto;
    padding: 8px;
    border: solid 1px #cccccc;
    border-radius: 6px;
    box-shadow: 3px 3px 3px 1px #dddddd;
}

.card_width_small{
    width: 50%;
}

.card_width_normal{
    width: 70%;
}

.card_width_large{
    width: 90%;
}

.card_title{
    /*position: relative;*/
    display: block;
    width: auto;
    min-height: 20px;
    margin: 5px 10px;
    color: #666666;
    font-size: 24px;
    font-weight: bold;
}


.card_title_name{
    position: relative;
    display: inline-block;
    padding: 0 5px;
    z-index: 2;
}

.card_title_name::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 2px;
    width: 100%;
    height: 10px;
    background: hsla(100,80%,50%,0.8);
    z-index: -1;
}

.card_container{
    min-height: 50px;
}

.card_action{
    display: flex;
    flex-direction: row;
    justify-content: right;
    gap: 30px;
}

.action_button{
    padding: 2px 8px;
    border-radius: 16px;
    border: solid 1px #999999;
    color: #666666;
}

.action_button:hover{
    cursor: pointer;
    background: hsla(200,80%,50%,0.7);
    color: white;
}

</style>
