<template>
<div id="todo_list">

  <header id="top_title">
      <div id="title">ToDoList任务表</div>
      <div id="theme"></div>
  </header>
  <div id="profile">
      <div id="picture" :style="{'--back':`url(${user.profilePicture})`}">
<!--          <img :src="profilePicture" alt="user" style="width: 60px;height: 60px;">-->
          <input type="file" id="picture_input" @change="setUserPicture" ref="pictureInputRef">
      </div>
      <div id="name" @mouseenter="isShowEditName=true" @mouseleave="isShowEditName=false">
          <div v-if="!isEditName">{{user.userName}}</div>
          <input id="name_input" v-model="user.userName" v-if="isEditName" @change="isEditName=false" @blur="isEditName=false" @keydown.esc="isEditName=false" ref="nameInputRef">
          <div id="name_edit" v-if="isShowEditName&&!isEditName" @click="beginEditName">edit</div>
      </div>
  </div>
  <div id="task_classify">
      <div :class="{'task_classification':true,'active_task_classification':activeClass===classify.value,'normal_task_classification':activeClass!==classify.value}" v-for="classify in classifyList" :key="classify.value" @click="chooseClassify(classify.value)">
          {{classify.name}}
      </div>
  </div>
  <div id="task_statistic">
      <div id="task_number">{{showedTaskList.length}}</div>
      <div id="number_tip">Tasks Remaining</div>
  </div>
  <div id="task_control">
<!--      <div>{{activeClass}}</div>-->
      <div id="task_search">
          <input id="task_search_input" v-model="searchContent" @input="searchTask" type="search" placeholder="查找任务..." autocomplete="off">
      </div>
      <div id="add_task" @click="beginCreateTask">+ 添加任务</div>
      <div id="task_create" v-if="isAddTask" >
          <input id="new_task_input" autocomplete="off" v-model="newTaskContent" @keydown.enter="goodAddTask" placeholder="还有什么需要做的？" ref="createTaskInputRef"></input>
          <div id="new_task_control">
              <div id="cancel_new_task" @click="isAddTask=false">取消</div>
              <div id="add_new_task" @click="goodAddTask">添加</div>
          </div>
      </div>
  </div>
  <main id="task_container">
      <div class="task" v-for="task in showedTaskList" :key="task.taskId">
          <input type="checkbox" class="task_status" v-model="task.taskStatus" ></input>
          <div :class="{'task_title':true,'done_task_title':task.taskStatus}">{{task.taskTitle}}</div>
          <div class="task_time">{{task.taskTime}}</div>
          <div class="task_manage">
              <div class="task_edit" @click="editTask(task.taskId)">修改</div>
              <div class="task_delete" @click="deleteTask(task.taskId)">删除</div>
          </div>
      </div>
  </main>
    <div style="width: 100%;height: 400px;">

    </div>

</div>
</template>

<script setup>
import {computed, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, watch} from "vue";
import {debounce, generateId} from "@/utils/util.js";

//状态管理
const isEditName = ref(false);
const isShowEditName = ref(false);
const activeClass = ref("all");
const isAddTask = ref(false);

//数据管理
const user = ref({
    profilePicture:null,
    userName:''
});

const classifyList = ref([
    {name:"所有的",value:"all"},
    {name: "进行中",value: "doing"},
    {name: "已完成",value: "done"}
])
const taskList = ref([
    {taskTitle:"吃饭",taskStatus:false,taskTime:"2025/11/13"}
]);
const newTaskContent = ref('');
const searchContent = ref('');

//dom操作
const pictureInputRef = ref(null);
const nameInputRef = ref(null);
const createTaskInputRef = ref(null);









const setUserPicture = function (){
    const file = pictureInputRef.value?.files?.[0];
    if(file){
        if(user.value.profilePicture && user.value.profilePicture.startsWith('blob:')){
            URL.revokeObjectURL(user.value.profilePicture.value);
        }
        user.value.profilePicture = URL.createObjectURL(file);
    }
}

const beginEditName = function (){
    isEditName.value = true;
    nextTick(() => {
        nameInputRef.value?.focus();
    })
}

const chooseClassify = function (classify){
    activeClass.value = classify;
}

const searchTask = function (){
    // showedTaskList.value = showedTaskList.value.filter((task) => task.taskTitle.includes(searchContent.value));
}

const beginCreateTask = function (){
    isAddTask.value = true;
    nextTick(() => {
        createTaskInputRef.value?.focus();
    })
}

const addTask = function (){
    const addTime = new Date();
    const newTask = {
        taskTitle:newTaskContent.value,
        taskStatus:false,
        taskTime:addTime,
        taskId:generateId()
    };
    taskList.value.unshift(newTask);
    newTaskContent.value = '';
}

//防抖的好函数
const goodAddTask = debounce(addTask,1000,true);

const editTask = function (taskId){
    let newContent = window.prompt("新的任务内容");

    taskList.value.forEach((task) => {
        if(task.taskId === taskId){
            task.taskTitle = newContent;
        }
    })
}

const deleteTask = function (taskId){
    const targetIndex = taskList.value.findIndex((task)=>task.taskId === taskId);
    taskList.value.splice(targetIndex,1);
}

const showedTaskList = computed(() => {

        let searchedTaskList = taskList.value;

        if(searchContent.value)  searchedTaskList  = taskList.value.filter((task) => task.taskTitle.includes(searchContent.value))

        if(activeClass.value === "all"){
            return searchedTaskList;
        }else if(activeClass.value === "done"){
            return searchedTaskList.filter((task) => task.taskStatus === true)
        }else if(activeClass.value === "doing"){
            return searchedTaskList.filter((task) => task.taskStatus === false)
        }


})

watch(user,() => {
    localStorage.setItem("user",JSON.stringify(user.value))
},{deep:true})

watch(taskList,() => {
    localStorage.setItem("taskList",JSON.stringify(taskList.value))
},{deep:true})


onMounted(() =>{
    let localTaskList = JSON.parse(localStorage.getItem("taskList"))
    if(localTaskList){
        taskList.value = localTaskList;
    }else {
        taskList.value = [];
    }

    let localUser = JSON.parse(localStorage.getItem("user"));
    if(localUser){
        user.value = localUser
    }else {
        user.value = {profilePicture: null,userName: "学习者"};
    }
})

onBeforeUnmount(() => {
    localStorage.setItem("taskList",JSON.stringify(taskList.value))
})

</script>

<style scoped>
/*div{*/
/*    margin: 0 auto;*/
/*    text-align: center;*/
/*}*/


#todo_list{
    /*全局外观设置*/
    --bg-color: #fafafa;
    --ele-color: #555555;

    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: flex-start;*/
    /*align-items: center;*/
    width: 100%;
    height: 100%;
    background: var(--bg-color);
    overflow: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
}

#top_title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    padding: 10px;
    box-shadow: 0 2px 4px  #cdcdcd;
    color: cornflowerblue;
    font-size: 28px;
    font-weight: bold;
}

#profile{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 20px;
    width: 100%;
    height: 80px;
    padding: 5px 10px;
}

#picture{
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: solid 2px rgba(240,240,240,1);
    background-image: var(--back);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;

}

#picture_input{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}

#name{
    display: flex;
    flex-direction: row;
    align-items: center;
    color: cadetblue;
    font-weight: bold;
    font-size: large;
}

#name_edit{
    margin: 4px;
    cursor: pointer;
}

#name_input{
    outline: none;
    color: cadetblue;
    font-weight: bold;
    font-size: large;
}

#task_classify{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: clamp(40px,20rem,60px);
    margin: 20px 0;
    color: #999999;
    font-size: 18px;
    /*font-weight: bold;*/
}

.task_classification{
    width: auto;
    padding: 4px 12px;
    border-radius: 8px;
    cursor: pointer;
}

.normal_task_classification:hover{
    color: hsla(250,80%,50%,1);
    background: hsla(250,80%,50%,0.1);
}

.active_task_classification{
    color: white;
    font-weight: bold;
    background: hsla(250,80%,50%,0.7);
}

#task_statistic{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 20px auto;
    height: 120px;
    border-radius: 12px;
    background: linear-gradient(120deg,hsla(250,80%,50%,0.7),hsla(270,80%,50%,0.7));
    color: white;
}

#task_number{
    font-size: 28px;
    font-weight: bold;
}

#task_search{
    display: flex;
    justify-content: center;
    align-items: center;
}

#task_search_input{
    outline: 0;
    /*border: 0;*/

    width: 80%;
    padding: 4px;
    border: 1px solid #cccccc;
    border-radius: 8px;
    font-size: 20px;
}

#task_search_input::placeholder{
    color: cadetblue;
    font-size: 18px;
    margin: 4px;
}

#task_search_input:focus{
    outline: solid 3px hsla(190,80%,50%,0.4);
}

#add_task{
    width: 80%;
    height: 40px;
    margin: 10px auto;
    border-radius: 8px;
    background: hsla(240,70%,50%,0.6);
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    vertical-align: center;
    line-height: 40px;
    cursor: pointer;
}

#add_task:hover{
    transform: translateY(-4px);
    background: hsla(240,90%,50%,0.9);
}

#task_create{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    width: 80%;
    height: 100px;
    margin: 10px auto;
    border-radius: 12px;
    border: solid 1px #cdcdcd;
    box-shadow: 2px 3px 4px 4px #dddddd;
}

#new_task_input{
    outline: 0;
    width: 90%;
    margin: 10px auto;
    padding: 5px;
    border: solid 1px #cccccc;
    border-radius: 6px;
    font-size: 20px;
}

#new_task_input:focus{
    outline: solid 3px hsla(190,80%,50%,0.4);
}

#new_task_control{
    display: flex;
    flex-direction: row;
    justify-content: right;
    gap: 20px;
    width: 80%;
}

#cancel_new_task,#add_new_task{
    padding: 4px 12px;
    border-radius: 12px;
    border:solid 1px #dddddd;
    cursor: pointer;
}

#cancel_new_task{
    color: #999999;
}

#add_new_task{
    color: white;
    background: hsla(240,90%,50%,0.9);
}

#task_container{
    width: 100%;
    height: auto;
}

.task{
    width: 90%;
    margin: 10px auto;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #cdcdcd;
    box-shadow: 2px 2px 5px 0 #cdcdcd;
}


.task_status{
    scale: 1.5;
}

.task_title{
    padding: 10px;
    font-size: 28px;
    color: #555555;
}

.done_task_title{
    text-decoration: hsla(200,80%,50%,0.9) solid line-through;
}

.task_time{
    font-size: 14px;
    color: #aaaaaa;
}

.task_manage{
    display: flex;
    flex-direction: row;
    justify-content: right;
    gap: 20px;
    margin: 0 20px;
}

.task_edit,.task_delete{
    color: #555555;
    padding: 4px 6px;
    border-radius: 6px;
    cursor: pointer;
}

.task_edit:hover,.task_delete:hover{
    background: #cdcdcd;
}

.task_edit:hover{
    color: deepskyblue;
}

.task_delete:hover{
    color: crimson;
}
</style>
