<template>
    <div id="test">
        <div id="title">技术测试界面</div>
        <Card width="large" title="测试卡片">
            123
        </Card>

        <Card title="transition测试" width="large">
            <button id="transition_button" @click="isTransition=!isTransition">change</button>
            <transition name="fade" mode="in-out">
                <div v-if="isTransition">1234</div>
            </transition>
            <div v-if="isTransition">1234</div>
        </Card>

        <Card title="CSS书写顺序">
            <table>
                <tr>
                    <td rowspan="3">外</td>
                    <td>布局</td>
                </tr>
                <tr>
                    <td>尺寸</td>
                </tr>
                <tr>
                    <td>间距</td>
                </tr>
                <tr>
                    <td rowspan="3">内</td>
                    <td>排版</td>
                </tr>
                <tr>
                    <td>背景</td>
                </tr>
                <tr>
                    <td>边框</td>
                </tr>
                <tr>
                    <td rowspan="2">表</td>
                    <td>效果</td>
                </tr>
                <tr>
                    <td>过滤</td>
                </tr>

            </table>
        </Card>

        <card title="teleport测试">
            <Button button-style="pixel"></Button>
            <teleport  to="body">
                <div id="teleport_test" v-if="isTeleport">
                    teleport测试
                </div>
            </teleport>
        </card>

        <card title="悬浮菜单">
            <div id="hover_target" ref="hoverTargetDom" @mouseenter="showHoverMenu" @mouseleave="hideHoverMenu">
                悬浮目标
                <div id="hover_menu" ref="hoverMenuDom">
                    <div class="hover_option">button1</div>
                    <div class="hover_option">button2</div>
                    <div class="hover_option">button3</div>
                    <div class="hover_option">button4</div>
                </div>
            </div>
        </card>


        <Card title="ref的作用对象">
            <div >源数据:{{refTest}}
                <button @click="refTest++">+1</button>
                <button @click="refTest--">-1</button>
            </div>
            <div >js数据:{{refJsTest}}
                <button @click="console.log(refJsTest)">点击打印</button>
            </div>
            <div >源数据:{{refTest}}</div>
            <div >源数据:{{refTest}}</div>
        </Card>

      <Card title="box-decoration-break效果">
        <div id="box-decoration-break_choose">
          <Button @click="changeBoxDecorationBreakState('clone')" text="clone"></Button>
          <Button @click="changeBoxDecorationBreakState('slice')" text="slice"></Button>
        </div>
        <div id="box-decoration-break_target">
          <p>这是一段很长的文字，其中<span :class="{'box-decoration-break_highlight':true,'slice_box-decoration-break_highlight':boxDecorationBreakState === 'slice','clone_box-decoration-break_highlight':boxDecorationBreakState !== 'slice'}">这个行内元素可能会被分割到多行显示</span>，观察其装饰效果。</p>
        </div>
      </Card>


      <Card title="堆叠上下文与图层">
        <Block style="z-index: 1" size="large" color="yellow">
          z-index:-1
          <Block style="z-index: 1;color: yellow" color="red">123</Block>
        </Block>
        <Block style="z-index: 1" color="gray">z-index:1</Block>
        <Block style="transform: translateY(-50px)">
          opacity111111
        </Block>
      </Card>
    </div>
</template>

<script setup>
import Card from "@/components/Card.vue";
import {nextTick, ref} from "vue";
import {bubbleRange, quickSort} from "@/utils/util.js";
import Button from "@/components/Button.vue";
import Block from "@/components/Block.vue";


const boxDecorationBreakState = ref("slice");

function changeBoxDecorationBreakState(newState) {
  boxDecorationBreakState.value = newState;
}

const isTransition = ref(false);
const isTeleport = ref(false);



const hoverTargetDom = ref(null);
const hoverMenuDom = ref(null);


const testObj = {

}

const refTest = ref(10);

const refJsTest = refTest.value;


function showHoverMenu() {
    nextTick(() => {
        hoverMenuDom.value.style.display = 'block';
    })
}

function hideHoverMenu() {
    nextTick(() => {
        hoverMenuDom.value.style.display = "none";
    })
}

const divide = function (a,b){
    console.log(a/b);
    if(b === 0){
        throw new Error("不能除0")
    }
    return a/b;
}
try{
    divide(5,0);
}catch (err){
    console.log(err)
}

const originList = [1,43,5,6,2,11,5,7,2,77];
console.log(bubbleRange(originList));


function outer(a){
    let b = 1;
    if ( a === undefined){
        b  = 0;
    }
    return function (){
        return a+b
    }
}

const inter = outer(10);
const inter1 = outer(100);

console.log(inter(),inter1());


async function tryAsync(){
    console.log('1');
    await asyncSetTime();
    await tryPromise;
    console.log("3");
}

tryAsync();

console.log("同步")

function asyncSetTime(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2")
            resolve("ok")
        },0)
    })
}

const tryPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log('2')
        resolve()
    },0)
}).then(() => {
    console.log("3+")
})

function mid (j){
    console.log(j);
}

for(var i = 0;i < 10;i++){
    setTimeout(mid(i),100)
}


const nums = [1,5,6,3,6,8,3,8,1,77,22,55,333,12,7,9];

console.log(quickSort(nums));


console.log(nums.__proto__.__proto__.__proto__)


class Person {
    constructor() {
        this.name = "Lydia"
    }
}

const member = new Person()


Person = class AnotherPerson {
    constructor() {
        this.name = "Sarah"
    }
}

console.log(member.name)

const myPromise = Promise.resolve(Promise.resolve("Promise!"));

function funcOne() {
    console.log("funcOne 开始");
    myPromise.then(res => {
        console.log("funcOne - 第一个 then");
        return res;
    }).then(res => {
        console.log("funcOne - 第二个 then:", res);
    });
    setTimeout(() => console.log("funcOne - Timeout!"), 0);
    console.log("funcOne - Last line!");
}

async function funcTwo() {
    console.log("funcTwo 开始");
    const res = await myPromise;
    console.log("funcTwo - 第一个 await 完成");
    console.log("funcTwo - 第二个 await:", await res);
    setTimeout(() => console.log("funcTwo - Timeout!"), 0);
    console.log("funcTwo - Last line!");
}

console.log("脚本开始");
funcOne();
funcTwo();
console.log("脚本结束");


console.log(1<2<3,"test")


</script>

<style scoped>
/* 进入/离开的激活状态 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

/* 进入开始/离开结束的状态 */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}


#test{
    height: 100%;
    overflow: scroll;
    scrollbar-width: none;
    position: relative;
}

#title{
    color: cornflowerblue;
    font-size: 24px;
    font-weight: bold;
}

#transition_button{
    width: 80px;
    height: 28px;
    border-radius: 14px;
}

#teleport_test{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 200px;
    background: rgba(0,0,0,0.8);
    color: white;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    z-index: 9999;
    backdrop-filter: blur(10px);
}

#hover_target{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    position: relative;
    top: 30px;
    left: 100px;
    width: 100px;
    margin: 20px;
    aspect-ratio: 1;
    border: solid 2px wheat;
    border-radius: 20px;
    cursor: pointer;
}

#hover_menu{
    display: none;
    position: absolute;
    top: 45px;
    left: 45px;
    width: 80px;
    aspect-ratio: 1;
    background: sandybrown;
    border-radius: 12px;
    cursor: pointer;
}
.box-decoration-break_highlight {
  box-decoration-break: clone;
  background: linear-gradient(45deg, #ff6b6b, #ffa726);
  border-radius: 8px;
  padding: 0 10px;
  margin: 0 5px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
}

.clone_box-decoration-break_highlight {
  box-decoration-break: clone;
}

.slice_box-decoration-break_highlight {
  box-decoration-break: slice;
}
</style>
